import Feedback from "../db/feedback.js";

export function voteFeedback(feedbackId, voteType) {
  try {
    const fb = new Feedback();
    const feedback = fb.getById(feedbackId);

    if (!feedback) {
      return { message: "Feedback not found", status: 404 };
    }

    // Ensure voteType is valid
    const delta = voteType === "upvote" ? 1 : voteType === "downvote" ? -1 : 0;
    if (delta === 0) {
      return { message: "Invalid vote type", status: 400 };
    }

    const updatedVotes = (feedback.votes || 0) + delta;

    const result = fb.updateById(feedbackId, {
      votes: updatedVotes,
    });

    if (!result) {
      return { message: "Error updating vote", status: 500 };
    }

    console.log(`${voteType}d feedback ${feedbackId}`);
    return { message: `Feedback ${voteType}d successfully`, status: 200 };
  } catch (error) {
    console.error("Vote error:", error);
    return { message: "Error updating vote", status: 500 };
  }
}
