// pages/NotFound.jsx
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
