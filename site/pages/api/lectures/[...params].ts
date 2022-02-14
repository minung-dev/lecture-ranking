// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const {
    query: { params },
  } = req;
  const [service, date, type] = params as string[];

  const data = await fetch(
    `https://raw.githubusercontent.com/hmu332233/action.new-lecture/main/action/history/${service}/${date}.json`,
  ).then((res) => res.json());

  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

  res.status(200).json(data[type]);
}
