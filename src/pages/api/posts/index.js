import { FETCH_POSTS_COUNT } from "../../../constants/post";
import prisma from "../../../lib/prisma";

export async function getLatestPostsFromDb() {
  const allLatestPosts = await prisma.post.findMany({
    take: FETCH_POSTS_COUNT,
    orderBy: {
      createdAt: "desc",
    },
  });

  // can mutate post here, as it does not matter
  /* eslint-disable no-param-reassign */
  return allLatestPosts.map((it) => {
    it.createdAt = it.createdAt.getTime();
    it.updatedAt = it.updatedAt.getTime();
    return it;
  });
  /* eslint-enable no-param-reassign */
}

export default async function handler(_req, res) {
  try {
    await new Promise((r) => {
      setTimeout(r, 500);
    });
    const allLatestPosts = await getLatestPostsFromDb();
    res.status(200).json(allLatestPosts);
  } catch (err) {
    console.log("database error!!!!!!!!!!!!!!!!!!!", err);
    res.status(500).json(err);
  }
}
