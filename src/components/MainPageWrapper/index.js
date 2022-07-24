import React from "react";
import PropTypes from "prop-types";
import MaxWidthContainer from "../common/MaxWidthContainer";
import Sidebar from "../SideBar";
import PostTab from "../PostTab";

function MainPageWrapper({ posts }) {
  return (
    <MaxWidthContainer>
      <div className="flex gap-4 w-full">
        <div className="flex-1 flex justify-center">
          <div className="max-w-2xl">
            <PostTab />
            {posts.map((post) => (
              <div className="mb-3" key={post.id}>
                {post.title}
                {new Date(post.createdAt).toString()}
              </div>
            ))}
          </div>
        </div>

        <Sidebar />
      </div>
    </MaxWidthContainer>
  );
}

MainPageWrapper.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default MainPageWrapper;
