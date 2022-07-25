import React from "react";
import PropTypes from "prop-types";
import Header from "../Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="p-4">{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
