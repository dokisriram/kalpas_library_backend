import * as dotenv from 'dotenv'
dotenv.config()

// firebase configuration for photo uploading
const firebaseConfig = {
  apiKey:process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
  appId:process.env.FIREBASE_APPID 
};
export default firebaseConfig
