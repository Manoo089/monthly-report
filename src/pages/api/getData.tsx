import client from "../../utils/postgres";

const getData = async () => {
  const entries = await client.query("SELECT * FROM berichte ORDER BY id ASC");
  return entries;
};

export default getData;
