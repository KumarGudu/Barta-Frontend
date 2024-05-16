import React, { useState } from "react";

const Chat = () => {
  const [div1W, setDiv1Width] = useState<String>("w-[25%]");
  const [div2W, setDiv2Width] = useState<String>("w-[75%]");
  const [isArchiveAccount, setIsArchiveAccount] = useState<Boolean>(true);
  return (
    <div className="flex min-h-screen bg-gray-400 items-start">
      <div className={`max-h-full bg-green-400 ${div1W} flex flex-col`}>
        {/* left header */}
        <div className="sticky top-0">
          <div className="w-full bg-lime-300 px-2 py-1">
            <h1>Header</h1>
          </div>
          <div className="bg-red-400">
            <h1>Search Bar</h1>
          </div>
          {isArchiveAccount && (
            <div>
              <h1>Archive bar</h1>
            </div>
          )}
        </div>

        {/* user list */}
        <div className="flex-1 overflow-auto">
          <h1>User List</h1>
        </div>
      </div>
      <div className={`min-h-full bg-blue-400 ${div2W} flex flex-col`}>
        <div className="w-full bg-red-300 px-2 py-1 sticky top-0">
          <h1>Header</h1>
        </div>
        <div className="bg-yellow-500 flex-1 overflow-auto">
          <h1>Middle message cont</h1>
        </div>
        <div className="bg-orange-500 sticky bottom-0">
          <h1>Bottom Input</h1>
        </div>
      </div>
    </div>
  );
};

export default Chat;
