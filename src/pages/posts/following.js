import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import React from "react";
import MainPageWrapper from "../../components/MainPageWrapper";
import axiosInstance, { POST_API } from "../../constants/api-config";

// TODO change api route for user followed users posts api
async function getLatestPosts() {
  const response = await axiosInstance.get(POST_API.POST);
  return response.data;
}

// TODO: this page is user dependent, so will run in protected route, so getStaticProps is not applicable here
// and also it is behind auth wall, getServerSide props is also not required, client side fetching will do the work
function FollowingPosts(props) {
  const { data, error, isLoading } = useQuery(
    ["followed-user-posts"],
    getLatestPosts
  );

  return (
    <>
      <Head>
        <title>Posted: Posts of followed people</title>
      </Head>
      <MainPageWrapper
        posts={data}
        isPostsLoading={isLoading}
        postsError={!data && error ? error : ""}
      />
    </>
  );
}

export default FollowingPosts;
