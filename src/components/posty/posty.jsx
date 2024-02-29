import './posty.css'

import React from "react";

export default function Posty(props) {
	
	function handleEditClick(e){
		console.log(e.target.parentElement.parentElement.key);
	};
	
	return (
		<>
			<div className="stickynote relative">
				<div className="absolute w-8 h-8 bg-red-700 rounded-full top-[-10px] left-1/2 -translate-x-1/2 shadow-[5px_5px_10px_2px_black]">
					<div className="absolute top-[7px] left-[8px] w-4 h-4 bg-red-900 rounded-full shadow-[1px_1px_3px_2px_black]"></div>
				</div>
				<div className="absolute right-2 top-2 flex gap-2">
					<span onClick={handleEditClick} className="bi bi-pencil cursor-pointer"></span>
					<span className="bi bi-x-lg cursor-pointer"></span>
				</div>
				<div className="mt-4">
					<h5 className="font-caveat text-xl mb-4 font-bold">{ props.date }</h5>
					<h4 className="text-sm text-center font-caveat text-xl text-red-900 font-bold">{ props.title }</h4>
				</div>
				<div className="text-center font-caveat text-xl font-bold">{ props.description }</div>
			</div>
		</>
	)
}
