import admin from "firebase-admin"

import firebaseCert from "@/config/firebase-cert"

export const getFirestore = () => {
  try {
    return admin.firestore()
  } catch {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseCert),
      databaseURL: "https://tucmc.firebaseio.com"
    })
    return admin.firestore()
  }
}
