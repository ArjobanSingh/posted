import prisma from "../../../lib/prisma";

export async function getUniquePostFromDb(postSlug) {
  const response = await prisma.post.findUnique({
    where: { slug: postSlug },
    include: {
      tags: {
        select: { tagName: true },
      },
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  response.createdAt = response.createdAt.getTime();
  response.updatedAt = response.updatedAt.getTime();
  return response;
}
export async function updatePost() {
  return {};
}

export default async function handler(req, res) {
  try {
    let response;
    if (req.method === "GET")
      response = await getUniquePostFromDb(req.query.postSlug);
    else if (req.method === "PUT") response = await updatePost();
    else throw new Error("Method Not suppoerted");

    console.log("Single Post", response);
    res.status(200).json(response);
  } catch (err) {
    console.log(`Post ${req.method} Error: ${err}`);
    res.status(500).json(err.message);
  }
}
