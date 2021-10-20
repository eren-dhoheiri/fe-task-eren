import React from "react";
import { LoadingGif } from "../../assets";

const style = {
  paddingTop: "10%",
  paddingBottom: "10%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Loading = () => {
  return (
    <div className="spinner" style={style}>
      <img src={LoadingGif} alt="Loading..." className="w-20" />
    </div>
  );
};

export default Loading;
