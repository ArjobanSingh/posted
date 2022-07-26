import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Sidebar from "../components/SideBar";
import MaxWidthContainer from "../components/common/MaxWidthContainer";
import { getUniquePostFromDb } from "./api/post/[postSlug]";
import axiosInstance, { POST_API } from "../constants/api-config";

// TODO: change to getStaticProps with fallback true
function PostDetails(props) {
  const router = useRouter();
  const { postSlug } = router.query;

  const getUniquePost = async () => {
    const response = await axiosInstance.get(`${POST_API.POST}/${postSlug}`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery(
    [`post-${postSlug}`],
    getUniquePost
  );

  if (isLoading) return <div>TODO: single post loading...</div>;
  if (!data && error) return <div>TODO: error, retry</div>;

  return (
    <MaxWidthContainer>
      <div className="flex gap-4 w-full">
        <div className="flex-1 flex justify-center">
          <div className="w-full">{data.content}</div>
        </div>
        <Sidebar />
      </div>
    </MaxWidthContainer>
  );
}

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();

  const { postSlug } = context.query;
  console.log("Server side postSlug", postSlug);
  await queryClient.prefetchQuery([`post-${postSlug}`], () =>
    getUniquePostFromDb(postSlug)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

PostDetails.propTypes = {};
export default PostDetails;
