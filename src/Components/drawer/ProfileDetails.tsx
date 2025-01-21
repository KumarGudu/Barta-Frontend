import React from "react";
import { Drawer, Typography, IconButton, Divider } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const ProfileDetails = ({ drawerOpen, handleCloseDrawer, selectedMember }) => {
  console.log("SELECTED_MEMBERS", selectedMember);
  return (
    <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
      <div className="p-4 bg-slate-100 h-full" style={{ width: 400 }}>
        <div className="flex justify-between items-center">
          <Typography variant="h6">{"Details"}</Typography>
          <IconButton onClick={handleCloseDrawer}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        {selectedMember && (
          <div className="mt-4 grid justify-center items-center">
            <div className="">
              <img
                src={
                  selectedMember[0]?.profileUrl ||
                  "https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_640.png"
                }
                alt={selectedMember[0]?.name}
                className="w-[10rem] h-[10rem] rounded-full mx-auto object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold">{selectedMember[0]?.name}</h2>
              <p className="text-sm text-gray-600">
                {selectedMember[0]?.email || "vdv"}
              </p>
              {/* <p className="text-sm text-gray-600">
                {selectedMember.phone || "ff"}
              </p> */}
              <p className="text-sm text-gray-600">
                {selectedMember[0]?.role || "ll"}
              </p>
              {/* <p className="text-sm text-gray-600">
                {selectedMember.slug || "ll"}
              </p> */}
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default ProfileDetails;
