import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push } from 'firebase/database';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

export const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

type LocalData = {
  name: string,
  latitude: number,
  longitude: number
}

export async function addLocalDataToDatabase(localData: LocalData) {
  const markersListRef = ref(database, 'markers');
  const newMarkerRef = push(markersListRef);
  return await set(newMarkerRef, localData);
}