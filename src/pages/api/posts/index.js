import { FETCH_POSTS_COUNT } from "../../../constants/post";
import prisma from "../../../lib/prisma";

export async function getLatestPostsFromDb() {
  const allLatestPosts = await prisma.post.findMany({
    take: FETCH_POSTS_COUNT,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      bannerUrl: true,
      createdAt: true,
      published: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      tags: {
        select: { tagName: true },
      },
    },
  });

  // can mutate post here, as it does not matter
  /* eslint-disable no-param-reassign */
  return allLatestPosts.map((it) => {
    it.createdAt = it.createdAt.getTime();
    return it;
  });
  /* eslint-enable no-param-reassign */
}

export default async function handler(_req, res) {
  try {
    const allLatestPosts = await getLatestPostsFromDb();
    res.status(200).json(allLatestPosts);
  } catch (err) {
    console.log("database error!!!!!!!!!!!!!!!!!!!", err);
    res.status(500).json(err.message);
  }
}
