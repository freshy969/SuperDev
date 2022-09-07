import Head from 'next/head';

export default function Home() {
	return (
		<>
			<div className='rounded-b-lg border border-t-0 border-borderLight dark:border-borderDark bg-gradient-to-r from-bodyOne to-bodyTwo dark:from-navOne dark:to-navTwo grid grid-cols-2 gap-x-4 p-5'>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-browsers px-[5px] text-bodyText'></i> Session Manager
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-palette px-[5px] text-bodyText'></i> Color Picker
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-swatchbook px-[5px] text-bodyText'></i> Color Palette
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-font-case px-[5px] text-bodyText'></i> Text Editor
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-text-size px-[5px] text-bodyText'></i> Lorem Ipsum
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-aperture px-[5px] text-bodyText'></i> Take Screenshot
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-image px-[5px] text-bodyText'></i> Extract Media
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-trash-can-xmark px-[5px] text-bodyText'></i> Delete Element
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-laptop-mobile px-[5px] text-bodyText'></i> Responsive Viewer
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-ruler-triangle px-[5px] text-bodyText'></i> Page Ruler
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-code-simple px-[5px] text-bodyText'></i> CSS Viewer
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-code px-[5px] text-bodyText'></i> CSS Editor
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-message-lines px-[5px] text-bodyText'></i> Fake Form Filler
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-face-disguise px-[5px] text-bodyText'></i> Go Incognito
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-rectangle-terminal px-[5px] text-bodyText'></i> Console Viewer
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-brackets-curly px-[5px] text-bodyText'></i> JSON Viewer
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-recycle px-[5px] text-bodyText'></i> Clear All Cache
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-key px-[5px] text-bodyText'></i> CORS Unblock
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-cookie px-[5px] text-bodyText'></i> Cookie Editor
				</button>
				<button className='rounded-[6px] text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-[13px] text-bodyText p-2.5 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
					<i className='fa-regular fa-database px-[5px] text-bodyText'></i> LocalStorage Editer
				</button>
			</div>
		</>
	);
}
