import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { connectToDatabase } from "../../../lib/db";
import { findUserWithEmail, hashPassword, updatePassword, verifyPassword } from "../../../lib/auth";
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user!.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const user = await findUserWithEmail(userEmail, client);

  if (!user) {
    res.status(404).json({ message: "User not found!" });
    client.end();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(422).json({ message: "Invalid Password!" });
    client.end();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await updatePassword(hashedPassword, userEmail, client);

  client.end();
  res.status(200).json({ message: "Password updated!" });
}

export default handler;
