// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore collections
const tripsCol = collection(db, "trips");

// Save a new trip
/**
 * Saves a trip to Firestore
 * @param {string} userId - The user's ID from Supabase
 * @param {string} destination - Trip destination
 * @param {number} days - Number of days for the trip
 * @param {string} plan - The trip plan details
 * @returns {Promise} A promise that resolves with the document reference
 */
export const saveTrip = async (userId, destination, days, plan) => {
  return addDoc(tripsCol, { 
    userId, 
    destination, 
    days, 
    plan, 
    createdAt: new Date().toISOString() 
  });
};

/**
 * Loads trips for a specific user
 * @param {string} userId - The user's ID from Supabase
 * @returns {Promise<Array>} A promise that resolves with an array of trip objects
 */
export const loadTrips = async (userId) => {
  const q = query(tripsCol, where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  }));
};
