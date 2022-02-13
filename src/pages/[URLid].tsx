import Router, { useRouter } from "next/router";
import React from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import initialiseDB from "../handlers/firebase-admin";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const db = initialiseDB.collection("locations").doc(params.URLid.toString());
  const URLbase = await db.get();
  let URLtarget: string;

  if (URLbase.exists) {
    // @ts-ignore
    window.gtag("event", "short_link_click", {
      event_category: "short_link_click",
      event_label: URLbase.get("title"),
      link: URLbase.get("target"),
    });
    URLtarget = URLbase.get("target");
  } else {
    URLtarget = "error";
  }

  return {
    props: { target: URLtarget, title: URLbase.get("title") || null },
    revalidate: URLtarget == "error" ? 1 : 2 * 60 * 60,
  };
};

const Page = ({ target, title }) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!router.isFallback) {
      if (target !== "error") {
        Router.push(target);
      }
      if (title) {
        document.title = title;
      }
    }
  }, [router.isFallback]);

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <div>Loading...</div>
      </>
    );
  }

  if (target !== "error") {
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <p>{title}</p>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Invalid Link</title>
        </Head>
        <p>Invalid Link</p>
      </>
    );
  }
};

export default Page;
