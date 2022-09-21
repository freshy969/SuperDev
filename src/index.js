import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import './css/global.css';
import './libs/css/font-awesome/css/pro.min.css';

const superDev = ReactDOM.createRoot(document.getElementById('superDev'));
superDev.render(
	<React.StrictMode>
		<Home />
	</React.StrictMode>
);
