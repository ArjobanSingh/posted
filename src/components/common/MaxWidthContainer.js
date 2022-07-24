import React from "react";
import PropTypes from "prop-types";

function MaxWidthContainer({ children }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl">{children}</div>
    </div>
  );
}

MaxWidthContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MaxWidthContainer;
