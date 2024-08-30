import React, { useState } from "react";

const ProfileButtonModal = ({ isOpen }) => {

  return (
    isOpen && (
      <div className="fixed right-16 top-[66px] z-10 flex w-72 flex-col gap-3 shadow-lg">
            Hello
      </div>
    )
  );
};
export default ProfileButtonModal;

