import Router from 'next/router'
import React, {useState} from 'react';
import {GetServerSideProps} from 'next';
import initialiseDB from '../../handlers/firebase-admin'
import moment from "moment-timezone";

export const getServerSideProps: GetServerSideProps = async ({ params}) => {
    const db = initialiseDB.collection("dynamic").doc(params.DynamicId.toString())
    const URLbase = await db.get()
    let conditionType: string, condition: string, dname: string, description: string
    if (URLbase.exists) {
        conditionType = URLbase.get("ctype")
        condition = URLbase.get("data")
        dname = URLbase.get("display")
        description = URLbase.get("description")
        return {
            props: {conditionType: conditionType, condition: condition, display: dname, description: description}
        }
    }else{
        conditionType = "error"
        return {
            props: {conditionType: conditionType, condition: null, display: null, description: null}
        }
    }
}

const getCurrentTime = (): number => {
    return (parseInt(moment().tz("Asia/Bangkok").format("H")) * 60) + parseInt(moment().tz("Asia/Bangkok").format("m"))
}

const Page = ({ conditionType, condition, display, description }) => {

    React.useEffect(() => {
        switch (conditionType) {
            case "time":
                document.title = display
                const conds = condition.split(", ")
                let argcon: string, argresult: string,val: number
                let current = getCurrentTime()
                conds.forEach((value: string) => {
                    argcon = value.split("|")[0]
                    argresult = value.split("|")[1]
                    if (argcon.includes("<=")) {
                        val = parseInt(argcon.replace("current <= ",""))
                        if (current <= val){
                            Router.push(argresult.replace(/ /g,""))
                        }
                    }else if (argcon.includes(">=")) {
                        val = parseInt(argcon.replace("current >= ",""))
                        if (current >= val){
                            Router.push(argresult.replace(/ /g,""))
                        }
                    } else if (argcon.includes("<")) {
                        val = parseInt(argcon.replace("current < ",""))
                        if (current < val){
                            Router.push(argresult.replace(/ /g,""))
                        }
                    } else if (argcon.includes(">")) {
                        val = parseInt(argcon.replace("current > ",""))
                        if (current > val){
                            Router.push(argresult.replace(/ /g,""))
                        }
                    }
                })
        }
    })

    if (conditionType !== "error") {
        return (
            <div>
                <p>{description}</p>
                <p>Redirecting...</p>
            </div>
        )
    }else{
        return (<p>Invalid link</p>)
    }
}

export default Page