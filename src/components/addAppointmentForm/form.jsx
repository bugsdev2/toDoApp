import React, {useState} from 'react'
import {useFormik} from 'formik';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function({childToParent}) {
	
	const [cookie, setCookie, removeCookie] = useCookies('userName');
	
	// SENDING FORM DATA TO BACKEND
	const formik = useFormik({
		initialValues: {
			date: '',
			title: '',
			description: ''
		},
		onSubmit: values => {
			axios.post(`https://todoapp-api-22b3.onrender.com/add-appointment/${cookie.userName}`, values);
			childToParent(false);
		}
	});
	
	return (
		<>
			<form id="wrapper" className="text-sm" onSubmit={formik.handleSubmit}>
				<h1 className="text-center font-bold text-bg-purple text-lg"> Add a New Stickee</h1>
				<div className="flex flex-col gap-1/2 text-bg-purple items-start">
					<label htmlFor="date" className="mx-3">Date</label>
					<input onChange={formik.handleChange} id="date" name="date" className="border border-bg-purple rounded-full w-full px-2 py-1" type="date" required/>
					<label htmlFor="title" className="mt-2 mx-3">Title</label>
					<input onChange={formik.handleChange} id="title" name="title" type="text" maxLength="30" className="border border-3 border-bg-purple rounded-full px-2 py-1 w-full" required/>
					<label htmlFor="description" className="mt-2 mx-2">Description</label>
					<textarea onChange={formik.handleChange} id="description" name="description" maxLength="85" className="border border-bg-purple w-full rounded-xl px-2 py-1 h-16 resize-none" required></textarea>
				</div>
				<div className="flex gap-2 justify-center mt-2">
					<button type="reset" className="btn-outline border-bg-purple">CLEAR</button>
					<button type="submit" className="btn bg-bg-purple text-white border-bg-purple hover:bg-[rgb(65,65,134)] hover:text-white">ADD</button>
				</div>
			</form>
		</>
	)
}

