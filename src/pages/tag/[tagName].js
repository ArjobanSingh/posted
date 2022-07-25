import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

function Tag(props) {
  const router = useRouter();
  const { tagName } = router.query;
  return <div>Tagname is {tagName}</div>;
}

Tag.propTypes = {};
export default Tag;
