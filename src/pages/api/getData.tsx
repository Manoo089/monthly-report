import client from "../../utils/postgres";

const getData = async (email: any) => {
  const getLoggedUser = await client.query("SELECT * FROM users WHERE email = $1", [email]);
  const userId = getLoggedUser.rows[0].id;

  const entries = await client.query(`SELECT * FROM user_${userId} ORDER BY id ASC`);
  return entries;
};

export default getData;
