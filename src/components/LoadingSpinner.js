import React from "react";
import { BeatLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <BeatLoader color={"#36D7B7"} size={15} />
    </div>
  );
};

export default LoadingSpinner;