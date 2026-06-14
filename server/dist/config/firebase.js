// src/config/firebase.ts
import admin from "firebase-admin";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// get the directory of THIS file (src/config/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
if (!admin.apps.length) {
    try {
        // join builds the path relative to THIS file's location
        // so it works no matter where you run node from
        const serviceAccount = JSON.parse(readFileSync(join(__dirname, "serviceAccountKey.json"), "utf8"));
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log("✅ Firebase Admin initialized");
    }
    catch (error) {
        if (error.code === "ENOENT") {
            console.error("❌ serviceAccountKey.json not found");
            console.error("   Expected at:", join(__dirname, "serviceAccountKey.json"));
            console.error("   Download from Firebase Console → Project Settings → Service Accounts");
            process.exit(1); // stop server — can't run without Firebase
        }
        throw error;
    }
}
export default admin;
//# sourceMappingURL=firebase.js.map