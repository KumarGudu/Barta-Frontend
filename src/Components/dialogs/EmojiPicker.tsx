import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerModel: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  // const handleEmojiClick = (emojiData: EmojiClickData) => {
  //   setMessage((prev) => prev + emojiData.emoji);
  // };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Your send message logic here (e.g., send message via Socket.IO)
      setMessage("");
    }
  };

  return (
    <div className="chat-input">
      {showEmojiPicker && (
        <EmojiPicker
        // onEmojiClick={handleEmojiClick}
        />
      )}

      <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />

      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default EmojiPickerModel;
