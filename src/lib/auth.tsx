import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export const findUserWithEmail = async (email: string | null | undefined, client: any) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];
  return client.query(query, values).then((result: any) => {
    return result.rows[0];
  });
};

export const findEmailCredentials = async (credentials: any, client: any) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [credentials.email];
  return client.query(query, values).then((result: any) => {
    return result.rows[0];
  });
};

export const updatePassword = async (password: string, email: string | null | undefined, client: any) => {
  const query = "UPDATE users SET password = $1 WHERE email = $2";
  const values = [password, email];
  return client.query(query, values);
}