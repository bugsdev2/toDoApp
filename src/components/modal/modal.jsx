import React, { useState } from 'react';


export default function Modal({isActive, onClose, children}) {
	
	if(!isActive) return null;
	
	function handleOutsideClickClose(e){
		if (e.target.id === 'modal-container') onClose();
	};
	
	return (
		<div id="modal-container" onClick={handleOutsideClickClose} className="modal-container">
			<div id="wrapper" className="bg-white px-6 py-3 rounded rounded-2xl w-80">
				<div className="flex justify-end">
					<span onClick={onClose} className="bi bi-x-lg text-black text-right py-1 cursor-pointer"></span>
				</div>
				<div>
					{children}
				</div>
			</div>
		</div>
	)
	
}
