const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
require("dotenv").config();

admin.initializeApp();
const db = admin.firestore();

const GEMINI_API_URL = "https://api.gemini.com/v1/popular_courses";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Function to fetch popular courses from Gemini API
async function fetchPopularCourses() {
  try {
    const response = await axios.get(GEMINI_API_URL, {
      headers: {
        Authorization: `Bearer ${GEMINI_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    throw new Error("Failed to fetch popular courses");
  }
}

// Scheduled function to run once a day
exports.dailyPopularCourses = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (context) => {
    try {
      const lastFetchedDoc = await db
        .collection("meta")
        .doc("lastFetched")
        .get();
      const lastFetched = lastFetchedDoc.exists
        ? lastFetchedDoc.data().timestamp.toDate()
        : null;

      // Check if the data was fetched within the last 24 hours
      const now = new Date();
      if (lastFetched && now - lastFetched < 24 * 60 * 60 * 1000) {
        console.log("Data was recently fetched. Skipping API call.");
        return;
      }

      const courses = await fetchPopularCourses();
      const timestamp = admin.firestore.Timestamp.now();

      // Write the courses to Firestore
      await db.collection("daily_popular_courses").add({
        timestamp,
        courses,
      });

      // Update last fetched timestamp
      await db.collection("meta").doc("lastFetched").set({ timestamp });

      console.log("Popular courses written to Firestore successfully");
    } catch (error) {
      console.error("Error writing popular courses to Firestore:", error);
    }
  });
