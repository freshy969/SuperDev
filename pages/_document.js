import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta name='description' content='SuperDev is Chrome Extension for Developers and Designers that Adds 20+ Extension’s Feature into a Single one.' />
				</Head>
				<body className='bg-gradient-to-r from-bodyOne to-bodyTwo dark:from-navOne dark:to-navTwo'>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
