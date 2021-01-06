import admin from 'firebase-admin'
import firebaseCert from '../config/firebaseCert'

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
