import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { request } from "../../lib/request";
import { useRouter } from "next/router";
import hash from "object-hash";
import { PageLink } from "@components";
import Head from "next/head";

const links = () => {
  const initialPageData = {
    title: "",
    description: "",
    data: [],
    cache_version: "",
  };

  const [pageData, setPageData] = useState(initialPageData);

  const router = useRouter();

  const fetchPageData = async () => {
    const id = "oph";
    if (id) {
      // load local cache
      const localCache = localStorage.getItem(`${id}_cache`);
      let localCacheVersion = null;

      if (localCache) {
        const parsedLocalCache = JSON.parse(localCache);
        if ("cache_version" in parsedLocalCache) {
          localCacheVersion = parsedLocalCache.cache_version;
          setPageData(parsedLocalCache);
          const localCacheHash = hash({
            ...parsedLocalCache,
            cache_version: "",
          });
          if (localCacheHash !== parsedLocalCache.cache_version) {
            localCacheVersion = null;
            localStorage.setItem(`${id}_cache`, "");
            setPageData(initialPageData);
          }
        }
      }

      const res = await request("table", "fetchPage", {
        id: id,
        localCacheVersion: localCacheVersion || "",
      });
      if (res.status) {
        if (res.data.cache_version) {
          localStorage.setItem(`${id}_cache`, JSON.stringify(res.data));
          setPageData(res.data);
        }
      }
    }
  };

  useEffect(() => {
    fetchPageData();
  }, [router.query]);

  return (
    <>
      <Head>
        <title>OPH Links</title>

        <meta name="title" content="OPH Links" />
        <meta
          name="description"
          content="Discover all the links provided by us here :) and feel free to check them out!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tucm.cc/oph/" />
        <meta property="og:title" content="OPH Links" />
        <meta
          property="og:description"
          content="Discover all the links provided by us here :) and feel free to check them out!"
        />
        {/* <meta
          property="og:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        /> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tucm.cc/oph/" />
        <meta property="twitter:title" content="OPH Links" />
        <meta
          property="twitter:description"
          content="Discover all the links provided by us here :) and feel free to check them out!"
        />
        {/* <meta
          property="twitter:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        /> */}
      </Head>
      <div className="flex flex-col items-center w-full h-full min-h-screen oph-gradient">
        <div className="flex mt-14 md:mt-28 w-4/5 h-4/5 custom-min-h max-w-md custom-max-h md:max-h-full">
          {/* <img className="absolute w-72 md:w-auto" src="./vectors/oph-bg.svg" /> */}
          <div className="flex flex-col item-center round-lg w-full glass-panel rounded-3xl">
            <div className="flex flex-col items-center mt-8 md:mt-12 mx-6 h-full md:mx-10">
              <img
                className="w-11/12 custom-max-w-oph -mb-6"
                src="/vectors/oph-icon.svg"
                alt="Website Icon"
              />
              <h1 className="mt-2 md:mt-3 text-center text-oph-purple font-extrabold text-2xl md:text-3xl">
                {pageData.title}
              </h1>
              <p className="text-center font-medium text-xs md:text-base text-oph-purple">
                {pageData.description}
              </p>
              <div className="mt-4 md:mt-6 border-b-2 border-oph-purple w-2/5"></div>
              <div className="px-1 space-y-6 w-full overflow-custom mt-4 pb-12 md:mt-6 font-semibold text-xs md:text-base font-display text-oph-purple">
                {pageData.data.map((value) => {
                  return <PageLink link={value.link} title={value.title} />;
                })}
              </div>
            </div>
          </div>
        </div>
        <img
          className="mt-10 md:mt-8 mb-8 z-10 w-44 md:w-64"
          src="/vectors/TUCMC.png"
          alt="TUCMC Icon"
        />
      </div>
    </>
  );
};

export default links;
