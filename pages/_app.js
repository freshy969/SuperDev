import '../css/global.css';
import '../libs/css/font-awesome/css/pro.min.css';

import Head from 'next/head';
import Navbar from '../components/Navbar';

function MyApp({Component, pageProps}) {
	return (
		<>
			<Head>
				<title>SuperDev</title>
			</Head>
			<Navbar />
			<main>
				<Component {...pageProps} />
			</main>
		</>
	);
}

export default MyApp;
