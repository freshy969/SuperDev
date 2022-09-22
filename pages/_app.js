import '../css/global.css';
import '../libs/css/font-awesome/css/pro.min.css';

import Head from 'next/head';

function MyApp({Component, pageProps}) {
	return (
		<>
			<Head>
				<title>SuperDev</title>
			</Head>
			<main>
				<Component {...pageProps} />
			</main>
		</>
	);
}

export default MyApp;
