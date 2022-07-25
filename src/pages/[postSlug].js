import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

// ssr or client side
// i guess ssr
function PostDetails(props) {
  const router = useRouter();
  const { postSlug } = router.query;
  return <div>{postSlug}</div>;
}

PostDetails.propTypes = {};
export default PostDetails;
