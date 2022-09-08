import Header from "../Header";

const Dashboard = () => {
	return (
		<div className='flex flex-col items-center justify-center w-full h-auto bg-primary'>
			<Header />
			<div className='w-[60%] my-4 bg-blue-500 p-4 flex items-center justify-center'></div>
		</div>
	);
};

export default Dashboard;
