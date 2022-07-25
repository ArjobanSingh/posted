import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

// TODO: for now just using client side logic, might use server rendered app
function AuthorDetails(props) {
  const router = useRouter();
  const { authorId } = router.query;
  return <div>authorId is {authorId}</div>;
}

AuthorDetails.propTypes = {};
export default AuthorDetails;
