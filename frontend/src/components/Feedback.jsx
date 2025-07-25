import UserIcon from "../assets/user.svg";
import UpIcon from "../assets/up.svg";
import BinIcon from "../assets/bin.svg";

const Feedback = ({
  id,
  name,
  email,
  message,
  votes,
  handleVote,
  handleDeletion,
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
      {/* Voting */}
      <div className="flex flex-col items-center gap-1">
        <button onClick={() => handleVote(id, "upvote")} title="Upvote">
          <img src={UpIcon} alt="Upvote" className="w-6" />
        </button>
        <p className="font-semibold">{votes}</p>
        <button onClick={() => handleVote(id, "downvote")} title="Downvote">
          <img src={UpIcon} alt="Downvote" className="w-6 rotate-180" />
        </button>
      </div>

      {/* User Info and Message */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <img src={UserIcon} alt={name} className="w-10 h-10" />
          <div className="text-sm">
            <p className="font-semibold">{name}</p>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>
        <p className="text-gray-800">{message}</p>
      </div>

      {/* Delete */}
      <button onClick={() => handleDeletion(id)} title="Delete">
        <img src={BinIcon} alt="Delete" className="w-6 hover:opacity-80" />
      </button>
    </div>
  );
};

export default Feedback;
