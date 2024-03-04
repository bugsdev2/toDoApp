import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Modal from '../modal/modal.jsx';

export default function StartUpPage() {
	
	const [cookie, setCookie, deleteCookie] = useCookies('userName');
	const navigate = useNavigate();
	const [flag, setFlag] = useState(false);
	const transferData = {};

	
	const loginForm = useFormik({
		initialValues: {
			userName: '',
			password: ''
		},
		onSubmit: (values) => {
			Object.assign(transferData, values);
			setFlag(true);
			const userName = values.userName;
			const password = values.password;
			axios.get(`https://todoapp-api-22b3.onrender.com/get-user/${userName}/${password}`).then((response) => {
				setFlag(false);
				setCookie('userName', userName, { sameSite: 'strict', maxAge: 3000000 });
				navigate('/dashboard');
			})
			.catch(err => {
				
			})
		}
	});
	
	const signUpForm = useFormik({
		initialValues: {
			userName: transferData.userName || '',
			password: transferData.password || '',
			firstName: '',
			lastName: ''
		},
		onSubmit: (values) => {
			setFlag(true);
			setCookie('userName', values.userName, { sameSite: 'strict', maxAge: 3000000 });
			axios.post('https://todoapp-api-22b3.onrender.com/add-user', values).then(() => {
				navigate('/dashboard');
			});
		}
	});
	
	const login = (
					<div className="bg-white text-bg-purple justify-self-center rounded-3xl p-4">
					  <div className="text-center font-bold text-lg">Login</div>
					  <form className="grid" onSubmit={loginForm.handleSubmit}>
						<label htmlFor="userNameLogin" className="mt-1">User Name</label>
						<input onChange={loginForm.handleChange} id="userNameLogin" name="userName" type="text" className="border border-bg-purple rounded-xl px-3 px-1" required/>
						<label htmlFor="passwordLogin" className="mt-1">Password</label>
						<input onChange={loginForm.handleChange} id="passwordLogin" name="password" type="password" className="border border-bg-purple rounded-xl px-3 px-1" required/>
						<div className="flex justify-center mt-3">
						  <button type="submit" className="btn">Log In</button>
						</div>
						<div className="text-center text-sm mt-2"><Link to="/signup">Sign Up for a New Account</Link></div>
					  </form>
					</div>
	)
				  
	const signup = (
					<div className="bg-white text-bg-purple justify-self-center rounded-3xl p-4">
					  <div className="text-center font-bold text-lg">Sign Up</div>
					  <form className="grid" onSubmit={signUpForm.handleSubmit}>
						<label htmlFor="userNameSignUp" className="mt-1">User Name</label>
						<input onChange={signUpForm.handleChange} id="userNameSignUp" name="userName" type="text" className="border border-bg-purple rounded-xl px-3 px-1" minLength="4" required/>
						<label htmlFor="passwordSignUp" className="mt-1">Password</label>
						<input onChange={signUpForm.handleChange} id="passwordSignUp" name="password" type="password" className="border border-bg-purple rounded-xl px-3 px-1" minLength="6" required/>
						<label htmlFor="firstNameSignUp" className="mt-1">First Name</label>
						<input onChange={signUpForm.handleChange} id="firstNameSignUp" name="firstName" type="text" className="border border-bg-purple rounded-xl px-3 px-1" minLength="3" required/>
						<label htmlFor="lastNameSignUp" className="mt-1">Last Name</label>
						<input onChange={signUpForm.handleChange} id="lastNameSignUp" name="lastName" type="text" className="border border-bg-purple rounded-xl px-3 px-1" minLength="3" required/>
						<div className="flex justify-center mt-3">
						  <button type="submit" className="btn">Sign Up</button>
						</div>
						<div className="text-center text-sm mt-2"><Link to="/login">Already have an Account? Log In</Link></div>
					  </form>
					</div>
	)
	
	const loader = (
					<div className="bg-white text-bg-purple justify-self-center rounded-3xl p-4">
					 <div>Please wait while we are loading your dashboard.</div>
					 <div>It may sometimes take a few seconds.</div>
					</div>
	)
	
	return (
		<div className="grid md:flex h-[100vh] w-[100vw]">
			  <header className="flex justify-center items-center py-20 text-white relative md:w-1/2 bg-rose-500">
				<img className="absolute w-48" src="/images/stickyNote.png" />
				<h1 className="text-7xl font-borel mt-20 z-20 text-white">Stickeez</h1>
			  </header>
			  <main className="grid items-center md:w-1/2 p-6">
				<Routes>
					<Route path="/*" element={login}/>
					<Route path="/signup" element={signup}/>
				</Routes>
			  </main>
		<Modal isActive={flag} onClose={() => setFlag(false)}>
			{ loader }
		</Modal>
		</div>
	  );
}
