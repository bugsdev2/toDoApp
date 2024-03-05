import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useFormik, Formik, Form, ErrorMessage, Field } from 'formik';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Modal from '../modal/modal.jsx';

export default function StartUpPage() {
	
	const [cookie, setCookie, deleteCookie] = useCookies('userName');
	const navigate = useNavigate();
	const [flag, setFlag] = useState(false);
	const [values, setValues] = useState({});

	useEffect(() => {
		if(cookie.userName) {
			navigate('/dashboard');
		}
	}, [cookie.userName]);

	
	const signUpForm = useFormik({
		initialValues: {
			userName:'',
			password:'',
			firstName: '',
			lastName: ''
		},
		onSubmit: (values) => {
			
		}
	});
	
	const login = (
					<div className="bg-white text-bg-purple justify-self-center rounded-3xl p-4">
					  <div className="text-center font-bold text-lg">Login</div>
					  <Formik initialValues={ 
							{
								userName: '',
								password: '',
							}
						  }
						  onSubmit={(values) => {
							setFlag(true);
							const userName = values.userName;
							const password = values.password;
							axios.get(`https://todoapp-api-22b3.onrender.com/get-user/${userName}/${password}`).then((response) => {
								if(response.data[0]) {
									setFlag(false);
									setCookie('userName', userName, { sameSite: 'none', maxAge: 3000000 , secure: true });
									navigate('/dashboard');
								} else {
									navigate('/signup');
									setFlag(false);
								}
							})
						  }}
						  >
						  <Form className="grid">
							<label htmlFor="userName" className="mt-1">User Name</label>
							<Field id="userName" name="userName" type="text" className="border border-bg-purple rounded-xl px-3 px-1" required/>
							<label htmlFor="password" className="mt-1">Password</label>
							<Field id="password" name="password" type="password" className="border border-bg-purple rounded-xl px-3 px-1" required/>
							<div className="flex justify-center mt-3">
							  <button type="submit" className="btn">Log In</button>
							</div>
							<div className="text-center text-sm mt-2"><Link to="/signup">Sign Up for a New Account</Link></div>
						  </Form>
					  </Formik>
					</div>
	)
				  
	const signup = (
					<div className="bg-white text-bg-purple justify-self-center rounded-3xl p-4">
					  <div className="text-center font-bold text-lg">Sign Up</div>
					  <Formik initialValues={{
						  userName: values.userName || '',
						  password: values.password || '',
						  firstName: '',
						  lastName: ''
					  }}
					  onSubmit = {(values) => {
							setValues(values);
							setFlag(true);
							setCookie('userName', values.userName, { sameSite: 'none', maxAge: 3000000, secure: true });
							axios.post('https://todoapp-api-22b3.onrender.com/add-user', values).then(() => {
								navigate('/login');
								setFlag(false);
							});
					  }}
					  >
						  <Form className="grid">
							<label htmlFor="userName" className="mt-1">User Name</label>
							<Field id="userName" name="userName" type="text" className="border border-bg-purple rounded-xl px-3 px-1" minLength="4" required/>
							<label htmlFor="passwordSignUp" className="mt-1">Password</label>
							<Field id="password" name="password" type="password" className="border border-bg-purple rounded-xl px-3 px-1" minLength="6" required/>
							<label htmlFor="firstName" className="mt-1">First Name</label>
							<Field id="firstName" name="firstName" type="text" className="border border-bg-purple rounded-xl px-3 px-1" minLength="3" required/>
							<label htmlFor="lastName" className="mt-1">Last Name</label>
							<Field id="lastName" name="lastName" type="text" className="border border-bg-purple rounded-xl px-3 px-1" minLength="3" required/>
							<div className="flex justify-center mt-3">
							  <button type="submit" className="btn">Sign Up</button>
							</div>
							<div className="text-center text-sm mt-2"><Link to="/login">Already have an Account? Log In</Link></div>
						  </Form>
					  </Formik>
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
					<Route path="/login" element={login}/>
					<Route path="/signup" element={signup}/>
					<Route index element={login}/>
				</Routes>
			  </main>
		<Modal isActive={flag} onClose={() => setFlag(false)}>
			{ loader }
		</Modal>
		</div>
	  );
}
