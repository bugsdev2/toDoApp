import './posty.css';
import axios from 'axios';
import Modal from '../modal/modal.jsx'
import React, {useState} from "react";


export default function Posty(props) {
	// TO GET THE EDIT AND CLOSE ICONS ON MOUSE HOVER
	function handleMouseEnter(e){
		const topRightBtnContainer = document.querySelector(`[data-key="${e.target.id}"]`);
		topRightBtnContainer.style.display = 'flex';
	};
	
	function handleMouseExit(e){
		const topRightBtnContainer = document.querySelector(`[data-key="${e.target.id}"]`);
		topRightBtnContainer.style.display = 'none';
	};
	
	// HANDLING EDIT BUTTON CLICK
	function handleEditClick(e){
		const id = e.target.parentElement.parentElement.id;
		console.log(id);
	};
	
	const [id, setId] = useState();
	
	// CONFIRMING CLOSE BUTTON CLICK
	function confirmCloseCLick(e){
		setId(e.target.parentElement.parentElement.id);
		setFlag(true);
	};
	
	// HANDLING CLOSE BUTTON CLICK 
	function handleCloseClick(){
		axios.delete(`https://todoapp-api-22b3.onrender.com/delete-appointment/john_oliver/${id}`)
	};
	
	const [flag, setFlag] = useState(false);
	
	return (
		<>
			<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit} id={props.id} className="stickynote relative">
				<div id={props.id} className="absolute w-8 h-8 bg-red-700 rounded-full top-[-10px] left-1/2 -translate-x-1/2 shadow-[5px_5px_10px_2px_black]">
					<div id={props.id} className="absolute top-[7px] left-[8px] w-4 h-4 bg-red-900 rounded-full shadow-[1px_1px_3px_2px_black]"></div>
				</div>
				<div id={props.id} data-key={props.id} style={{display: 'none'}} className="absolute right-2 top-2 flex gap-2">
					<span id={props.id} onClick={handleEditClick} className="bi bi-pencil cursor-pointer"></span>
					<span id={props.id} onClick={confirmCloseCLick} className="bi bi-x-lg cursor-pointer"></span>
				</div>
				<div id={props.id} className="mt-4">
					<h5 id={props.id} className="font-caveat text-xl mb-4 font-bold">{ props.date }</h5>
					<h4 id={props.id} className="text-sm text-center font-caveat text-xl text-red-900 font-bold">{ props.title }</h4>
				</div>
				<div id={props.id} className="text-center font-caveat text-xl font-bold">{ props.description }</div>
			</div>
			<Modal isActive={flag} onClose={() => setFlag(false)}>
				<div className="text-sm">
					<div>This will delete the Stickee. Are you sure you want to proceed?</div>
					<div className="flex gap-3 justify-center mt-3">
						<button onClick={handleCloseClick} type="button" className="btn hover:bg-bg-purple border-bg-purple hover:text-white">YES</button>
						<button onClick={() => setFlag(false)} type="button" className="btn hover:bg-bg-purple border-bg-purple hover:text-white">NO</button>
					</div>
				</div>
			</Modal>
		</>
	)
}
