import "./posty.css";
import axios from "axios";
import Modal from "../modal/modal.jsx";
import React, { useState, useEffect, useReducer } from "react";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import { useCookies } from 'react-cookie';

export default function Posty(props) {
  // TO GET THE EDIT AND CLOSE ICONS ON MOUSE HOVER
  function handleMouseEnter(e) {
    const topRightBtnContainer = document.querySelector(`[data-key="${e.target.id}"]`);
    topRightBtnContainer.style.display = "flex";
  }

  function handleMouseExit(e) {
    const topRightBtnContainer = document.querySelector(`[data-key="${e.target.id}"]`);
    topRightBtnContainer.style.display = "none";
  }

  const [id, setId] = useState(null);
  const [modalElem, setModalElem] = useState();
  const [flag, setFlag] = useState(false);
  const [userAppointmentState, setUserAppointmentState] = useState({});
  const [cookie, setCookie, removeCookie] = useCookies('userName');


  // HANDLING EDIT BUTTON CLICK
  function handleEditClick(e) {
    const id = parseInt(e.target.id);
    const userName = cookie.userName;
    const url = `https://todoapp-api-22b3.onrender.com/get-appointment/${userName}/${id}`
    axios.get(url)
      .then((response) => {
		const userAppointment = response.data[0];
		setUserAppointmentState(userAppointment);
        const newDate = userAppointment.date.slice(0,10);
       
        
		setModalElem(() => {
		  return (
			<Formik initialValues={
				{
					date: newDate, 
					title: userAppointment.title, 
					description: userAppointment.description
				}
			} 
			onSubmit={(values) => {
				axios.put(`https://todoapp-api-22b3.onrender.com/edit-appointment/${cookie.userName}/${id}`, values).then(() => {
					setFlag(false);
				});
			}} >
				<Form id="wrapper" className="text-sm">
				  <h1 className="text-center font-bold text-bg-purple text-lg">
					Edit your Stickee
				  </h1>
				  <div className="flex flex-col gap-1/2 text-bg-purple items-start">
					<label htmlFor="date" className="mx-3">Date</label>
					<Field id="date" name="date" className="border border-bg-purple rounded-full w-full px-2 py-1" type="date" required />
					<label htmlFor="title" className="mt-2 mx-3"> Title </label>
					<Field id="title" name="title" type="text" maxLength="30" className="border border-3 border-bg-purple rounded-full px-2 py-1 w-full" required />
					<label htmlFor="description" className="mt-2 mx-2"> Description </label>
					<Field type="textarea" id="description" name="description" maxLength="85" className="border border-bg-purple w-full rounded-xl px-2 py-1 h-16 resize-none" required></Field>
				  </div>
				  <div className="flex gap-2 justify-center mt-2">
					<button type="submit" className="btn bg-bg-purple text-white hover:border-xl border-bg-purple">UPDATE</button>
				  </div>
				</Form>
			</Formik>
		  );
		});
		setFlag(true);
		
      })
      .catch((err) => {
			
      });
   
      
    
  }

  // CONFIRMING CLOSE BUTTON CLICK
  function confirmCloseCLick(e) {
	  const id = e.target.id;
    setModalElem(() => {
      return (
        <div className="text-sm">
          <div>
            This will delete the Stickee. Are you sure you want to proceed?
          </div>
          <div className="flex gap-3 justify-center mt-3">
            <button onClick={() => handleCloseClick(id)} type="button" className="btn hover:bg-bg-purple border-bg-purple hover:text-white" >YES</button>
            <button onClick={() => setFlag(false)} type="button" className="btn hover:bg-bg-purple border-bg-purple hover:text-white"> NO</button>
          </div>
        </div>
      );
    });
    setFlag(true);
  }

  // HANDLING CLOSE BUTTON CLICK
  function handleCloseClick(id) {
	  const userName = cookie.userName;
    axios.delete(
      `https://todoapp-api-22b3.onrender.com/delete-appointment/${userName}/${id}`
    );
  }

  return (
    <>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit} id={props.id} className="stickynote relative">
        <div id={props.id} className="absolute w-8 h-8 bg-red-700 rounded-full top-[-10px] left-1/2 -translate-x-1/2 shadow-[5px_5px_10px_2px_black]">
          <div id={props.id} className="absolute top-[7px] left-[8px] w-4 h-4 bg-red-900 rounded-full shadow-[1px_1px_3px_2px_black]"></div>
        </div>
        <div id={props.id} data-key={props.id} style={{ display: "none" }} className="absolute right-2 top-2 flex gap-2">
          <span id={props.id} onClick={handleEditClick} className="bi bi-pencil cursor-pointer"></span>
          <span id={props.id} onClick={confirmCloseCLick} className="bi bi-x-lg cursor-pointer"></span>
        </div>
        <div id={props.id} className="mt-4">
          <h5 id={props.id} className="font-caveat text-xl mb-4 font-bold"> {props.date}</h5>
          <h4 id={props.id} className="text-center font-caveat text-xl text-red-900 font-bold">{props.title}</h4>
        </div>
        <div id={props.id} className="text-center font-caveat text-xl font-bold"> {props.description}</div>
      </div>
      <Modal isActive={flag} onClose={() => setFlag(false)}>
        { modalElem }
      </Modal>
    </>
  );
}
