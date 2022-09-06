export default function Navbar() {
	return (
		<>
			<div className='flex justify-between bg-gradient-to-r from-navOne to-navTwo py-[12px] px-5'>
				<h1 className='text-[14px] text-navText font-regular cursor-default'>
					SuperDev Pro <i className='fa-regular fa-window px-[3px]'></i>
				</h1>
				<div>
					<button className='text-right fa-solid fa-grip-dots-vertical text-navText text-sm'></button>
					<button className='text-right fa-regular fa-circle-half-stroke text-navText text-sm pl-[14px]'></button>
					<button className='text-right fa-regular fa-gear text-navText text-sm pl-3'></button>
				</div>
			</div>
		</>
	);
}
