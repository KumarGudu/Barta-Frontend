import React, { useState } from "react";
import axios from "axios";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import { usePostData } from "@/hooks/Api_Hooks";

const FileUpload = ({ handleClose, setAnchorEl }: any) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const { currentRoom } = useCurrentPrivateChatRoomStore();
  const { data, error, isLoading, postData } = usePostData<any>();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append each file
    formData.append("groupId", currentRoom?.roomId);
    formData.append("groupName", currentRoom?.name);
    formData.append("type", "IMAGE");
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    await postData(
      "chat/send-media",
      formData,
      {
        withCredentials: true,
      },
      true
    );

    handleClose();
    setAnchorEl(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">{isLoading ? "Loading...." : "Upload"}</button>
    </form>
  );
};

export default FileUpload;
