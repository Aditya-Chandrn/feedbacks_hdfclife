import axios from "axios";
// import { SERVER_URL } from "./utils/globals";
const SERVER_URL = "http://localhost:8000/feedback";

export async function createFeedbackApiCall(feedback) {
  try {
    const res = await axios.post(
      `${SERVER_URL}`,
      { feedback },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error creating feedback:", err);
    throw err;
  }
}

export async function getAllFeedbacksApiCall() {
  try {
    const res = await axios.get(`${SERVER_URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data.feedbacks;
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    throw err;
  }
}

export async function deleteFeedbackApiCall(feedbackId) {
  try {
    const res = await axios.delete(`${SERVER_URL}/${feedbackId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error deleting feedback:", err);
    throw err;
  }
}

export async function voteFeedbackApiCall(feedbackId, voteType) {
  try {
    const res = await axios.put(
      `${SERVER_URL}/${feedbackId}/vote`,
      { voteType }, // body
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error voting feedback:", err);
    throw err;
  }
}
