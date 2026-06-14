// src/config/firebase.ts
import admin from "firebase-admin"
import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)

if (!admin.apps.length) {
  try {
    let serviceAccount: admin.ServiceAccount

    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      // Production (Render) - read from env var
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      console.log("🔐 Using Firebase credentials from environment variable")
    } else {
      // Local dev - read from file
      serviceAccount = JSON.parse(
        readFileSync(join(__dirname, "serviceAccountKey.json"), "utf8")
      )
      console.log("🔐 Using Firebase credentials from local file")
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })

    console.log("✅ Firebase Admin initialized")

  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.error("❌ serviceAccountKey.json not found")
      console.error("   Expected at:", join(__dirname, "serviceAccountKey.json"))
      console.error("   Set FIREBASE_SERVICE_ACCOUNT_KEY env var for production,")
      console.error("   or download the JSON from Firebase Console → Project Settings → Service Accounts for local dev")
      process.exit(1)
    }
    throw error
  }
}

export default admin