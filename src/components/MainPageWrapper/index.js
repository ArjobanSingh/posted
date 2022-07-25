import React from "react";
import PropTypes from "prop-types";
import MaxWidthContainer from "../common/MaxWidthContainer";
import Sidebar from "../SideBar";
import PostTab from "../PostTab";
import Post from "../Post";

function MainPageWrapper({ posts, isPostsLoading, postsError }) {
  const getMainContent = () => {
    if (isPostsLoading) return <div>TODO: Posts Loading...</div>;
    if (postsError) return <div>TODO: Posts error</div>;
    return posts.map((post) => <Post key={post.id} post={post} />);
  };

  return (
    <MaxWidthContainer>
      <div className="flex gap-4 w-full">
        <div className="flex-1 flex justify-center">
          <div className="max-w-2xl">
            <PostTab />
            {getMainContent()}
          </div>
        </div>

        <Sidebar />
      </div>
    </MaxWidthContainer>
  );
}

MainPageWrapper.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({})),
  isPostsLoading: PropTypes.bool.isRequired,
  postsError: PropTypes.string.isRequired,
};

MainPageWrapper.defaultProps = {
  posts: [],
};

export default MainPageWrapper;
