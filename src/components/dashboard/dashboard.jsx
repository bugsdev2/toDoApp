import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import Posty from '../posty/posty.jsx';
import Modal from '../modal/modal.jsx';
import AddAppointment from '../addAppointmentForm/form.jsx';

export default function Dashboard() {
	
	const [cookie, setCookie, removeCookie] = useCookies('userName');
	const navigate = useNavigate();
	
	// CREATING A VARIABLE FLAG TO CONTROL MODAL VISIBILITY ON SCREEN
	const [flag, setFlag] = useState(false);

	useEffect(() => {
		if(cookie.userName === undefined || cookie.userName === '') {
			navigate('/');
		};
	}, [cookie['userName']]);
	
	//~ console.log(cookie.userName);
	const [appointments, setAppointments] = useState([]);
	
	// GETTING APPOINTMENTS OF USER
	useEffect(() => {
		const userName = cookie.userName;
		const url = `https://todoapp-api-22b3.onrender.com/get-appointments/${userName}`
		axios.get(url)
		.then(response => {
			setAppointments(response.data);
		})
		.catch(err => {
			console.log(err);
		})
	},[appointments]);
	
	// SORTING THE APPOINTMENTS BY DATE
	appointments.sort((a,b) => {
		if (a.date < b.date) return -1;
		if (a.date > b.date) return 1;
		return 0;
	});
	
	// CREATING POSTIES FROM
	const posties = appointments.map(item => {
		const newDate = new Date(item.date)
		return (
			<Posty
				key={item._id}
				id={item.id}
				title={item.title}
				date={`${newDate.toDateString()}`}
				description={item.description}
			/>)
		}
	)
	
	const [,forceUpdate] = useReducer(x => x + 1, 0);
	
	
	
	// SETTING UP A CHILD TO PARENT DATA SHARING FUNCTION	
	function childToParent(data){
		setFlag(data);
	};
	
	
	
	function handleLogOut() {
		removeCookie('userName');
		navigate('/');
	};
	
	return (
		<>	
			<header className="relative text-white">
				<div className="text-center text-3xl md:text-5xl tracking-wide mt-10 font-borel">Stickeez</div>
				<div className="text-center"> Welcome, {cookie.userName} </div>
				<div className="hidden md:block absolute right-4 -top-2 cursor-pointer">
					<button onClick={handleLogOut} className="btn-outline">Log Out</button>
				</div>
				<div onClick={handleLogOut} className="bi bi-box-arrow-left md:hidden absolute right-4 -top-2 text-2xl cursor-pointer" title="Log Out"></div>
			</header>
			<section className="flex justify-center p-4 text-white">
				<button className="btn-outline">
					<span className="bi bi-plus-circle text-sm"></span>
					<span onClick={() => setFlag(true)} className='text-sm'>ADD A NEW STICKEE</span>
				</button>
			</section>
			<main className="flex justify-center flex-wrap gap-4 z-index-10">
				{ posties }
			</main>
			<Modal isActive={flag} onClose={() => setFlag(false)}>
				{<AddAppointment childToParent={childToParent} />}
			</Modal>
		</>
	)
	
}
