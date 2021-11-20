import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { request } from "../lib/request";
import { useRouter } from "next/router";
import hash from "object-hash";
import { PageLink } from "@components";

const links = () => {
	const initialPageData = {
		title: "",
		description: "",
		data: [],
		cache_version: "",
	};

	const [pageData, setPageData] = useState(initialPageData);

	const fetchPageData = async () => {
		const id = "tucmc";
		if (id) {
			// load local cache
			const localCache = localStorage.getItem(`${id}_cache`);
			let localCacheVersion = null;

			if (localCache) {
				const parsedLocalCache = JSON.parse(localCache);
				if ("cache_version" in parsedLocalCache) {
					localCacheVersion = parsedLocalCache.cache_version;
					setPageData(parsedLocalCache);
					const localCacheHash = hash({ ...parsedLocalCache, cache_version: "" });
					if (localCacheHash !== parsedLocalCache.cache_version) {
						localCacheVersion = null;
						localStorage.setItem(`${id}_cache`, "");
						setPageData(initialPageData);
					}
				}
			}

			const res = await request("table", "fetchPage", { id: id, localCacheVersion: localCacheVersion || "" });
			if (res.status) {
				if (res.data.cache_version) {
					setPageData(res.data);
					localStorage.setItem(`${id}_cache`, JSON.stringify(res.data));
				}
			}
		}
	};

	useEffect(() => {
		fetchPageData();
	}, []);

	return (
		<div className="flex flex-col items-center w-full h-full min-h-screen mid-complex-gradient">
			<div className="flex mt-14 md:mt-28 w-4/5 h-4/5 custom-min-h max-w-md custom-max-h md:max-h-full">
				<img className="absolute w-72 md:w-auto" src="./vectors/bg.svg" />
				<div className="flex flex-col item-center round-lg w-full glass-panel rounded-3xl">
					<div className="flex flex-col items-center mt-8 md:mt-12 mx-6 h-full md:mx-10">
						<img className="w-4/6 custom-max-w" src="/vectors/timeTab.png" alt="Website Icon" />
						<h1 className="mt-3 md:mt-6 text-center text-purple-625 font-extrabold text-2xl md:text-3xl">
							{pageData.title}
						</h1>
						<p className="text-center font-medium text-xs md:text-base text-purple-625">{pageData.description}</p>
						<div className="mt-4 md:mt-6 border-b-2 border-purple-625 w-2/5"></div>
						<div className="px-1 space-y-6 w-full overflow-custom mt-4 pb-12 md:mt-6 font-semibold text-xs md:text-base font-display text-purple-625">
							<PageLink link="https://forms.gle/NUQuNCHivCXyEeuGA/" title="แบบฟอร์มรับสมัครพิธีกร OPH 2022 🪞" />
							<PageLink link="https://loykratong.triamudom.club/" title="ลอยกระทงออนไลน์ 2021 🌊" />
							{pageData.data.map((value) => {
								return <PageLink link={value.link} key={value.title} title={value.title} />;
							})}
						</div>
					</div>
				</div>
			</div>
			<img className="mt-10 md:mt-8 mb-8 z-10 w-44 md:w-64" src="/vectors/TUCMC.png" alt="TUCMC Icon" />
		</div>
	);
};

export default links;
