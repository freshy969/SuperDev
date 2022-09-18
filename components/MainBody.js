import DisableAllFeatureExcept from '/components/functions/DisableAllFeatureExcept';

export default function MainBody() {
	let allFeatures = JSON.parse(localStorage.getItem('allFeatures'));

	return (
		<section id='mainBody'>
			<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
				{allFeatures.map((value, index) => {
					if (value.isEnabled === true) {
						return (
							<button
								key={index}
								id={value.id}
								onClick={() => DisableAllFeatureExcept(value.id)}
								className={
									value.id +
									' rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300'
								}>
								<i className={'fa-regular ' + value.icon + ' px-[5px] text-bodyText'}></i> {value.title}
							</button>
						);
					} else {
						return (
							<button
								key={index}
								id={value.id}
								className={
									value.id +
									' rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300 hidden'
								}>
								<i className={'fa-regular ' + value.icon + ' px-[5px] text-bodyText'}></i> {value.title}
							</button>
						);
					}
				})}
			</div>
		</section>
	);
}
