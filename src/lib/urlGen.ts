import cryptoRandomString from "crypto-random-string"

import { getFirestore } from "@/lib/firebase-admin"

const LENGTH = 5

export const urlGen = async (urlInput: string, owner: string) => {
  let randomId: string = cryptoRandomString({
    length: LENGTH,
    type: "alphanumeric"
  })
  const output: { status: string; shortURL: string } = {
    status: "failed",
    shortURL: ""
  }

  if (!owner) return output

  const firestore = getFirestore()

  const db = firestore.collection("locations")
  const validity = await db.where("target", "==", urlInput).get()
  if (validity.empty) {
    // perform generation
    if (!urlInput.includes("tucm.cc")) {
      let targetDoc = await db.doc(randomId).get()
      while (targetDoc.exists) {
        randomId = cryptoRandomString({ length: LENGTH, type: "alphanumeric" })
        // eslint-disable-next-line no-await-in-loop
        targetDoc = await db.doc(randomId).get()
      }

      try {
        const urlT = await fetch(urlInput)
        const body = await urlT.text()
        let title
        if (body.includes("<title>")) {
          title = body?.split("<title>")[1]?.split("</title>")[0]
          title = title?.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        } else {
          title = ""
        }

        await db.doc(randomId).set({ target: urlInput, title, owner })
        output.shortURL = `https://tucm.cc/${randomId}`
        output.status = "success"
        return output
      } catch (_) {
        return output
      }
    }

    return output
  }
  // pull existed record
  output.shortURL = `https://tucm.cc/${validity.docs[0]?.id}`
  output.status = "success"
  return output
}
