import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Posty from '../posty/posty.jsx';

export default function Dashboard() {
	
	const [appointments, setAppointments] = useState([]);
	
	useEffect(() => {
		const url = 'https://todoapp-api-22b3.onrender.com/get-appointments/john_oliver'
		axios.get(url)
		.then(response => {
			setAppointments(response.data);
		})
		.catch(err => {
			console.log(err);
		})
	},[]);
	
	appointments.sort((a,b) => {
		if (a.date < b.date) return -1;
		if (a.date > b.date) return 1;
		return 0;
	});
	
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
	
	return (
		<>	
			<header className="relative">
				<div className="text-center text-xl">STICKIE-IT</div>
				<div className="bi bi-list md:hidden absolute right-4 top-0 text-2xl cursor-pointer"></div>
			</header>
			<section className="flex justify-center p-4">
				<button className="btn">
					<span className="bi bi-plus-circle text-sm"></span>
					<span className='text-sm'>Add a New Stickie</span>
				</button>
			</section>
			<main className="flex justify-center flex-wrap gap-4">
				{ posties }
			</main>
		</>
	)
	
}
