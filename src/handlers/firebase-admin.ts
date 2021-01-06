import admin from 'firebase-admin'
import firebaseCert from '../private/key/tucmc-298007-bfb5b388045a.json'

const initialiseDB = () => {
    try {
        return admin.firestore()
    } catch {
        admin.initializeApp({
            credential: admin.credential.cert(firebaseCert),
            databaseURL: 'https://tucmc.firebaseio.com'
        })
        return admin.firestore()
    }
}

export default initialiseDB()
