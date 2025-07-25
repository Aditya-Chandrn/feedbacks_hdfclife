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
    <div className="bg-white shadow-md rounded-xl py-6 px-8 flex flex-col items-start gap-4 transition-all ">
      {/* Voting + Delete */}
      <div className="flex justify-between items-center gap-4 w-full">
        {/* Voting Buttons */}
        <div className="flex flex-row items-center gap-5">
          <button
            onClick={() => handleVote(id, "upvote")}
            title="Upvote"
            className="hover:scale-110 transition-transform"
          >
            <img
              src={UpIcon}
              alt="Upvote"
              className="w-6 hover:brightness-0 hover:drop-shadow-[0_0_2px_rgba(34,197,94,0.8)]"
            />
          </button>
          <p className="font-semibold">{votes}</p>
          <button
            onClick={() => handleVote(id, "downvote")}
            title="Downvote"
            className="hover:scale-110 transition-transform"
          >
            <img
              src={UpIcon}
              alt="Downvote"
              className="w-6 rotate-180 hover:brightness-0 hover:drop-shadow-[0_0_2px_rgba(239,68,68,0.8)]"
            />
          </button>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => handleDeletion(id)}
          title="Delete"
          className="hover:scale-110 transition-transform"
        >
          <img
            src={BinIcon}
            alt="Delete"
            className="w-6 hover:brightness-0 hover:drop-shadow-[0_0_2px_rgba(220,38,38,0.8)]"
          />
        </button>
      </div>

      {/* User Info and Message */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <img src={UserIcon} alt={name} className="w-10 h-10" />
          <div className="text-sm">
            <p className="font-semibold text-blue-700">{name}</p>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>
        <p className="text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default Feedback;
