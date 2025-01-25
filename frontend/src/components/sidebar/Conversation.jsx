import PropTypes from "prop-types";
import useGetConversations from "../../zustand/useConversation";
const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } =
    useGetConversations();

  const isSelected = selectedConversation?._id === conversation._id;
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected && "bg-sky-500"
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="avatar ">
          <div className="w-12 rounded-full">
            <img
              src="https://cdn4.iconfinder.com/data/icons/turu-education-set/48/Artboard_8-512.png"
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">
              {conversation.fName} {conversation.lName}
            </p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider"></div>}
    </>
  );
};
Conversation.propTypes = {
  conversation: PropTypes.shape({
    fName: PropTypes.string.isRequired,
    lName: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  lastIdx: PropTypes.bool.isRequired,
};

export default Conversation;
