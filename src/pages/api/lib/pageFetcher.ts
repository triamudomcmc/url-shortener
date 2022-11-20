import initialisedDB from "../../../handlers/firebase-admin";
import objectArray from "../../../types/objectArray";
import { NextApiRequest, NextApiResponse } from "next";
import hash from "object-hash";
import Cookies from "cookies";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import {LoggedUser, unpackToken} from "tucmc-auth";

export const fetchPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await initialisedDB.collection("userPages").doc(req.body.id).get();

  if (!db.exists) return { status: false };

  if (req.body.localCacheVersion !== "") {
    if (db.get("cache_version") === req.body.localCacheVersion)
      return { status: true, data: {} };
  }

  return { status: true, data: db.data() };
};

export const getPageList = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res, { keys: [process.env.COOKIE_KEY] });
  const sessionID = cookies.get("sessionID", { signed: true });
  const sessionData = await initialisedDB
      .collection("session")
      .doc(sessionID)
      .get()

  return {status: true, data: {pages: sessionData.get("page")}}
}

export const updatePage = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res, { keys: [process.env.COOKIE_KEY] });
  const sessionID = cookies.get("sessionID", { signed: true });
  const sessionData = await initialisedDB
    .collection("session")
    .doc(sessionID)
    .get();

  if (!sessionData.get("page").includes(req.body.id)) return { status: false };
  const pageHash = hash({ ...req.body.pageData, cache_version: "" });
  await initialisedDB
    .collection("userPages")
    .doc(req.body.id)
    .set({ ...req.body.pageData, cache_version: pageHash });

  return { status: true };
};

export const destroyCookie = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const cookies = new Cookies(req, res, { keys: [process.env.COOKIE_KEY] });
  cookies.set("sessionID");

  return { status: true };
};

export const validateToken = async (
  req: NextApiRequest,
  result: NextApiResponse
) => {
  const { authToken, fp, reqToken } = req.body;

  if (!authToken) return { success: false };

  const unpackedToken = await unpackToken(req.body, process.env.API_KEY)

  if (!unpackedToken.success) {
    return {success: false}
  }

  const userData: LoggedUser = unpackedToken.unpacked

  const url = await initialisedDB
    .collection("users").doc(userData.user.studentID)
    .get();

  const sess = await initialisedDB.collection("session").add({
    page: url.get("page"),
  });

  const expires = new Date().getTime() + 2 * 60 * 60 * 1000;

  const cookies = new Cookies(req, result, { keys: [process.env.COOKIE_KEY] });

  cookies.set("sessionID", sess.id, {
    httpOnly: true,
    sameSite: "Strict",
    signed: true,
    expires: new Date(expires),
  });

  return unpackedToken
};
