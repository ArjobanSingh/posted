// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import main from "../../lib/seed";

export default async function handler(_req, res) {
  try {
    // only uncomment when needed to use this api for seeding
    // const response = await main();
    res.status(200).json({});
  } catch (err) {
    console.log("Custom Error!!!!!!!!!!!!!!!!!!!", err);
    res.status(500).json(err);
  }
}
