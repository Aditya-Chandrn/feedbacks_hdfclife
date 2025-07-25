import { useState, useEffect } from "react";
import {
  deleteFeedbackApiCall,
  getAllFeedbacksApiCall,
  voteFeedbackApiCall,
} from "../apiCalls";
import Feedback from "../components/Feedback";
import CreateIcon from "../assets/create.svg";
import { Link } from "react-router-dom";

const Home = () => {
  // Local state to hold all feedback entries
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch all feedbacks from backend
  const getFeedbacks = async () => {
    try {
      const fetchedFeedbacks = await getAllFeedbacksApiCall();
      setFeedbacks(fetchedFeedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  // Handle upvote/downvote, then refresh data
  const handleVote = async (feedbackId, type) => {
    await voteFeedbackApiCall(feedbackId, type);
    getFeedbacks();
  };

  // Handle deletion, then refresh data
  const handleDeletion = async (feedbackId) => {
    await deleteFeedbackApiCall(feedbackId);
    getFeedbacks();
  };

  // Fetch feedbacks on component mount
  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      {/* Header with title and link to create feedback */}
      <header className="flex justify-between">
        <h1 className="text-2xl font-semibold text-center">All Feedbacks</h1>

        <Link to="/create">
          <img
            src={CreateIcon}
            alt="Create Feedback"
            title="Create Feedback"
            className="w-10 hover:scale-110 transition-transform"
          />
        </Link>
      </header>

      {/* Render message if no feedbacks, else render list */}
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
