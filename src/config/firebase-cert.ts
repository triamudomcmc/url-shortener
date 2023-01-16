import * as dotenv from "dotenv"

const firebaseCert = () => {
  dotenv.config()

  return {
    projectId: process.env.FCERT_PROJECT_ID,
    private_key_id: process.env.FCERT_PRIVATE_KEY_ID,
    private_key: process.env.FCERT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.FCERT_CLIENT_EMAIL,
    client_id: process.env.FCERT_CLIENT_ID
  }
}

export default firebaseCert()
