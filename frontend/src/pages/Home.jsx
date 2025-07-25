import { useState, useEffect } from "react";
import {
  deleteFeedbackApiCall,
  getAllFeedbacksApiCall,
  voteFeedbackApiCall,
} from "../apiCalls";
import Feedback from "../components/Feedback";

const Home = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const getFeedbacks = async () => {
    try {
      const fetchedFeedbacks = await getAllFeedbacksApiCall();
      setFeedbacks(fetchedFeedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const handleVote = async (feedbackId, type) => {
    await voteFeedbackApiCall(feedbackId, type);
    getFeedbacks();
  };

  const handleDeletion = async (feedbackId) => {
    await deleteFeedbackApiCall(feedbackId);
    getFeedbacks();
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-center">All Feedback</h1>

      {feedbacks.length === 0 ? (
        <p className="text-center text-gray-500">No feedback available.</p>
      ) : (
        feedbacks.map((fb) => (
          <Feedback
            key={fb.id}
            id={fb.id}
            email={fb.email}
            name={fb.name}
            message={fb.message}
            votes={fb.votes}
            handleVote={handleVote}
            handleDeletion={handleDeletion}
          />
        ))
      )}
    </div>
  );
};

export default Home;
