import client from "../../../utils/postgres";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }
  
  const { counter, date, id } = req.body;
  console.log({ id });

  const userEmail = session.user!.email;

  const getLoggedUser = await client.query("SELECT * FROM users WHERE email = $1", [userEmail]);
  const userId = getLoggedUser.rows[0].id;

  const query = `UPDATE user_${userId} SET counter = $1, date = $2 WHERE id = $3`;
  try {
    await client.query(query, [counter, date, id]); // sends queries
    res.status(201).send({ message: "data modified!" });
    client.end();
  } catch (error: any) {
    console.error(error.stack);
    client.end();
    return false;
  }
};

export default handler;
