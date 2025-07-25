import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFeedbackApiCall } from "../apiCalls";

const CreateFeedback = () => {
  // State to hold form inputs
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });

  // Update form state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    await createFeedbackApiCall(formData); // Send data to backend

    // Reload home page to refresh data
    window.location.href = "http://localhost:3000";
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Header with back button and title */}
      <header className="flex gap-5">
        <button
          onClick={() => (window.location.href = "/")}
          className="mb-4 text-blue-600 hover:underline font-bold text-xl"
        >
          ←
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create Feedback
        </h2>
      </header>

      {/* Feedback form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email input */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Name input */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Message input */}
        <textarea
          name="message"
          placeholder="Your Feedback"
          className="w-full p-2 border rounded h-32"
          value={formData.message}
          onChange={handleChange}
          required
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default CreateFeedback;
