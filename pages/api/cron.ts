// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler() {
  if (!process.env.MONDAY_DEPLOY_URL) {
    throw new Error(
      "You must define MONDAY_DEPLOY_URL env variable for this cron."
    );
  }
  return await fetch(process.env.MONDAY_DEPLOY_URL);
}
