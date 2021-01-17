import initialisedDB from "../../../handlers/firebase-admin";
import objectArray from "../../../types/objectArray";

export const fetchTable = async (): Promise<objectArray> => {

  const db = initialisedDB.collection("portal")
  const data = await db.listDocuments()
  const item: objectArray = []
  for (const doc of data) {
    let row = await doc.get()
    item.push({title: row.get("title"),link: row.get("link")})
  }

  return item

}