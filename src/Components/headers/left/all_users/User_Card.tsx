import { generateWhatsAppMessage } from "@/utils/functions";
import React from "react";

const User_Card = ({
  name,
  profile,
  slugName,
}: {
  name: string;
  profile: string;
  slugName: string;
}) => {
  return (
    <div className="flex items-center bg-gray-400 gap-3 px-2 py-2 rounded-md">
      <div>
        <img
          src={
            profile
              ? profile
              : "https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_640.png"
          }
          alt="profilePic"
          width={50}
          height={50}
          className="rounded-full mt-1"
        />
      </div>
      <div>
        <p>{name}</p>
        <p className="text-sm">
          {generateWhatsAppMessage().length > 20
            ? `${generateWhatsAppMessage().slice(0, 20)}.....`
            : `${generateWhatsAppMessage()}`}
        </p>
      </div>
    </div>
  );
};

export default User_Card;
