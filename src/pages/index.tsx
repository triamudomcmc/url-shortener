import React, { useEffect } from "react";
import { InputForm } from "@components";

const Index = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen mid-complex-gradient">
			<div className="py-10 px-16 rounded-3xl glass-panel">
				<h1 className="text-6xl font-bold text-purple-625 font-display mb-4 text-center">Url Shortener</h1>
				<p className="text-xl font-medium text-purple-600 mt-4 mb-8 text-center">
					Paste your link here and click{" "}
					<span className="p-1 rounded-md bg-gray-100 border-white bg-opacity-80 text-purple-500">shrink</span> to
					shorten your link now!
				</p>
				<InputForm />
			</div>
			<img className="mt-10 md:mt-8 mb-8 z-10 w-44 md:w-64" src="/vectors/TUCMC.png" alt="TUCMC Icon" />
		</div>
	);
};

export default Index;
