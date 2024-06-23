import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

const Send_Message_Input = ({
  message,
  setMessage,
}: {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}) => {
  const [height, setHeight] = useState("auto"); // Initial height
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleChange = (event: any) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      // Handle send message logic here
      // For demo, let's just clear the message
      setMessage("");
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [message]);

  return (
    <div className="min-h-[4rem] max-h-[10rem] bg-pink-300 absolute bottom-0 left-0 flex py-2 px-3 items-center gap-3 w-full">
      <div className="flex gap-3 items-center bg-blue-700">
        <p>emo</p>
        <p>other</p>
      </div>
      <div className="h-full flex-grow">
        <textarea
          className="text-input w-full max-h-[9rem] overflow-y-scroll resize-none place-content-center px-5 py-1 outline-none"
          ref={textareaRef}
          style={{ height: height }}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          // onKeyUp={handleKeyUp}
          placeholder="Type a message..."
        />
      </div>
      <div className="bg-blue-700 w-[5rem]">
        <button>Send</button>
      </div>
    </div>
  );
};

export default Send_Message_Input;
