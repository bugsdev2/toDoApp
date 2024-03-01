import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Posty from '../posty/posty.jsx';
import Modal from '../modal/modal.jsx';
import AddAppointment from '../addAppointmentForm/form.jsx';

export default function Dashboard() {
	
	const [appointments, setAppointments] = useState([]);
	
	// GETTING APPOINTMENTS OF USER
	useEffect(() => {
		const url = 'https://todoapp-api-22b3.onrender.com/get-appointments/john_oliver'
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
	
	// SETTING UP A CHILD TO PARENT DATA SHARING FUNCTION	
	function childToParent(data){
		setFlag(data);
	};
	
	// CREATING A VARIABLE FLAG TO CONTROL MODAL VISIBILITY ON SCREEN
	const [flag, setFlag] = useState(false);
	
	
	return (
		<>	
			<header className="relative text-white">
				<div className="text-center text-xl tracking-widest mt-4">STICKEEZ</div>
				<div className="bi bi-list md:hidden absolute right-4 top-0 text-2xl cursor-pointer"></div>
			</header>
			<section className="flex justify-center p-4 text-white">
				<button className="btn">
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
