import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import prisma from "./prisma";

const NUMBER_OF_USERS = 10;
const MAX_POSTS_PER_USER = 15;
const MAX_PARAGRAPHS_PER_POST = 20;
const MAX_WORDS_PER_TITLE = 10;
const MAX_TAGS_PER_POST = 5;

const isEven = (n) => n % 2 === 0;
const uniqueTagNames = [
  "react",
  "node js",
  "JavaScript",
  "postgres",
  "next js",
  "lifestyle",
  "lorem",
  "prisma",
  "cricket",
  "olympics",
  "science",
];

const allTags = uniqueTagNames.map((tag) => ({
  name: tag,
}));

const getUsers = () => {
  const postsArray = Array.from({
    length: faker.datatype.number({ min: 0, max: MAX_POSTS_PER_USER }),
  });

  return Array.from({
    length: NUMBER_OF_USERS,
  }).map(() => ({
    email: faker.internet.email(),
    name: faker.name.firstName(),
    bio: faker.lorem.paragraphs(),
    image: faker.internet.avatar(),
    posts: {
      create: postsArray.map(() => {
        const title = faker.lorem.words(
          faker.datatype.number({ min: 3, max: MAX_WORDS_PER_TITLE })
        );
        const slug = `${title.replace(/\s+/g, "-").toLowerCase()}-${nanoid(
          15
        )}`;
        const copiedTags = [...uniqueTagNames];

        const tagsForThisPostArr = Array.from({
          length: faker.datatype.number({
            min: 1,
            max: MAX_TAGS_PER_POST,
          }),
        });

        return {
          content: faker.lorem.paragraphs(
            faker.datatype.number({ min: 3, max: MAX_PARAGRAPHS_PER_POST })
          ),
          title,
          slug,
          published: true,
          bannerUrl: isEven(faker.random.numeric())
            ? faker.image.imageUrl(1920, 720)
            : null,
          tags: {
            create: tagsForThisPostArr.map(() => {
              const indexOfTagToUse = faker.datatype.number({
                min: 0,
                max: copiedTags.length - 1,
              });
              const tagName = copiedTags[indexOfTagToUse];
              copiedTags.splice(indexOfTagToUse, 1);

              return {
                tag: {
                  connect: { name: tagName },
                },
              };
            }),
          },
        };
      }),
    },
  }));
};

export default async function main() {
  await prisma.$transaction([
    prisma.tag.createMany({ data: allTags }),
    ...getUsers().map((user) =>
      prisma.user.create({
        data: user,
      })
    ),
  ]);
}

// main().finally(async () => {
//   await prisma.$disconnect();
// });
