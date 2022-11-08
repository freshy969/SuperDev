import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import './css/index.css';
import './libs/css/font-awesome/css/pro.min.css';

const root = ReactDOM.createRoot(document.querySelector('#superDevPopupChild'));
root.render(
	<React.StrictMode>
		<Home />
	</React.StrictMode>
);
