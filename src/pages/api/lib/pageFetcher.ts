import Cookies from "cookies"
import type { NextApiRequest, NextApiResponse } from "next"
import hash from "object-hash"
import { unpackToken } from "tucmc-auth"

import { getFirestore } from "../../../lib/firebase-admin"

export const fetchPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await getFirestore().collection("userPages").doc(req.body.id).get()

  if (!db.exists) return { status: false }

  if (req.body.localCacheVersion !== "") {
    if (db.get("cache_version") === req.body.localCacheVersion)
      return { status: true, data: {} }
  }

  return { status: true, data: db.data() }
}

export const getPageList = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (!process.env.COOKIE_KEY) return { status: false }
  const cookies = new Cookies(req, res, { keys: [process.env.COOKIE_KEY] })
  const sessionID = cookies.get("sessionID", { signed: true })
  const sessionData = await getFirestore()
    .collection("session")
    .doc(sessionID || "")
    .get()

  const pages = sessionData.get("page") || []
  return { status: true, data: { pages } }
}

export const updatePage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.COOKIE_KEY) return { status: false }
  const cookies = new Cookies(req, res, { keys: [process.env.COOKIE_KEY] })
  const sessionID = cookies.get("sessionID", { signed: true })
  const sessionData = await getFirestore()
    .collection("session")
    .doc(sessionID || "")
    .get()

  if (!sessionData.get("page").includes(req.body.id)) return { status: false }
  const pageHash = hash({ ...req.body.pageData, cache_version: "" })
  await getFirestore()
    .collection("userPages")
    .doc(req.body.id)
    .set({ ...req.body.pageData, cache_version: pageHash })

  return { status: true }
}

export const destroyCookie = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (!process.env.COOKIE_KEY) return { status: false }
  const cookies = new Cookies(req, res, { keys: [process.env.COOKIE_KEY] })
  cookies.set("sessionID")

  return { status: true }
}

export const validateToken = async (
  req: NextApiRequest,
  result: NextApiResponse
) => {
  const { authToken, fp, reqToken } = req.body

  if (!authToken) return { success: false }

  const unpackedToken = await unpackToken(req.body, process.env.API_KEY || "")

  if (!unpackedToken.success) {
    return { success: false }
  }

  const userData = unpackedToken.unpacked

  if (!userData) return { success: false }
  if (!userData.user.studentID) return { success: false }

  const url = await getFirestore()
    .collection("users")
    .doc(userData.user.studentID)
    .get()

  const sess = await getFirestore()
    .collection("session")
    .add({
      page: url.get("page") || []
    })

  const expires = new Date().getTime() + 2 * 60 * 60 * 1000
  if (!process.env.COOKIE_KEY) return { status: false }
  const cookies = new Cookies(req, result, { keys: [process.env.COOKIE_KEY] })

  cookies.set("sessionID", sess.id, {
    httpOnly: true,
    sameSite: "strict",
    signed: true,
    expires: new Date(expires)
  })

  return unpackedToken
}
