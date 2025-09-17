import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-8 h-8 border-3 border-primary-admin border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
