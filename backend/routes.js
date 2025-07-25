import { Router } from "express";
import { voteFeedback } from "./controllers/voteFeedback.js";
import Feedback from "./db/feedback.js";

const router = Router();

// Create new feedback
router.post("", (req, res) => {
  try {
    const { feedback } = req.body;

    const newFeedback = new Feedback(
      feedback.email,
      feedback.name,
      feedback.message
    );
    newFeedback.create();

    console.log("Created new feedback");
    res.status(200).json({ message: "Created new feedback successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all feedbacks
router.get("", (req, res) => {
  try {
    const fb = new Feedback();
    const feedbacks = fb.getAll().reverse(); // Return latest feedbacks first
    console.log("Fetched all feedbacks");
    res.status(200).json({ message: "All feedbacks fetched", feedbacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Vote on feedback (upvote/downvote)
router.put("/:id/vote", (req, res) => {
  const feedbackId = req.params.id;
  const { voteType } = req.body;

  try {
    const feedbacks = voteFeedback(feedbackId, voteType);
    res.status(200).json({ message: "All feedbacks fetched", feedbacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a feedback by ID
router.delete("/:id", (req, res) => {
  const feedbackId = req.params.id;

  try {
    const fb = new Feedback();
    const result = fb.deleteById(feedbackId);

    if (result) {
      console.log(`Deleted feedback ${feedbackId}`);
      res.status(200).json({ message: "Feedback deleted successfully" });
    } else {
      res.status(500).json({ message: "Error deleting feedback" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
