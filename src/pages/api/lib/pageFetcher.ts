import initialisedDB from "../../../handlers/firebase-admin";
import objectArray from "../../../types/objectArray";
import { NextApiRequest, NextApiResponse } from "next";
import hash from "object-hash";
import Cookies from "cookies";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const fetchPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await initialisedDB.collection("userPages").doc(req.body.id).get();

  if (!db.exists) return { status: false };

  if (req.body.localCacheVersion !== "") {
    if (db.get("cache_version") === req.body.localCacheVersion)
      return { status: true, data: {} };
  }

  return { status: true, data: db.data() };
};

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

  if (!authToken) return { status: false };

  const res = await fetch(`https://account.triamudom.club/api/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "fetchAuthToken",
      authToken: authToken,
      reqToken: reqToken,
      privateKey: process.env.API_KEY,
      fp: fp,
    }),
  });

  const jsonResult = await res.json();
  if (!jsonResult.status) return { status: false };

  const userData = jsonResult.data.data;

  const cookies = new Cookies(req, result, { keys: [process.env.COOKIE_KEY] });
  const url = await initialisedDB
    .collection("users")
    .doc(userData.data.studentID)
    .get();

  const sess = await initialisedDB.collection("session").add({
    page: url.get("page"),
  });

  const expires = new Date().getTime() + 2 * 60 * 60 * 1000;

  cookies.set("sessionID", sess.id, {
    httpOnly: true,
    sameSite: "Strict",
    signed: true,
    expires: new Date(expires),
  });

  if (jsonResult.status) {
    return {
      status: true,
      data: {
        ...jsonResult.data.data,
        data: { ...jsonResult.data.data.data, pages: url.get("page") },
      },
    };
  } else {
    return { status: false, data: {} };
  }
};
