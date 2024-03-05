
import './App.css';
import './output.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import React, {useEffect} from 'react';

import StartUpPage from './components/startuppage/startuppage.jsx';
import Dashboard from './components/dashboard/dashboard.jsx';


function App() {
	
	const navigate = useNavigate();
	
	return (
		
			<div>
				<Routes>
					<Route path="/" element=<StartUpPage/> />
					<Route path="/dashboard" element=<Dashboard/> />
					<Route index element=<StartUpPage/> />
				</Routes>
			</div>
		
	)
	
}

export default App
