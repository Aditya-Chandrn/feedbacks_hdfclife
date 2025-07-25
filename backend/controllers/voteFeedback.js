import Feedback from "../db/feedback.js";

export function voteFeedback(feedbackId, voteType) {
  try {
    const fb = new Feedback();
    const feedback = fb.getById(feedbackId);
    if (!feedback) return { message: "Feedback not found", status: 404 };

    const result = feedback.updateById({
      vote: feedback.votes + (voteType === "upvote" ? 1 : -1),
    });

    if (!result) return { message: "Error updating vote", status: 500 };

    console.log(`${voteType}d feedback ${feedbackId}`);
    return { message: `Feedback ${voteType}d successfully`, status: 200 };
  } catch (error) {
    console.error(error);
    return { message: "Error updating vote", status: 500 };
  }
}
