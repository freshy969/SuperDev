import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import './css/global.css';
import './libs/css/font-awesome/css/pro.min.css';

const root = ReactDOM.createRoot(document.getElementById('superDevBody'));
root.render(
	<React.StrictMode>
		<Home />
	</React.StrictMode>
);
