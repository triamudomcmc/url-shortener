import Router from 'next/router'
import React from 'react';
import {GetServerSideProps} from 'next';
import initialiseDB from '../handlers/firebase-admin'

export const getServerSideProps: GetServerSideProps = async ({ params}) => {
    const db = initialiseDB.collection("locations").doc(params.URLid.toString())
    const URLbase = await db.get()
    let URLtarget: string
    if (URLbase.exists) {
        URLtarget = URLbase.get("target")
    }else{
        URLtarget = "error"
    }
    return {
        props: {target: URLtarget, title: URLbase.get("title") || null}
    }
}

const Page = ({ target, title }) => {
    React.useEffect(() => {
        if (target !== "error") {
            Router.push(target)
        }
        if (title) {
            document.title = title
        }else{
            document.title = "URL Shortener"
        }
    })
    if (target !== "error") {
        return (<p>Redirecting..</p>)
    }else{
        return (<p>Invalid link</p>)
    }
}

export default Page