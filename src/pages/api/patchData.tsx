import client from "../../utils/postgres";

const updateData = async (req: any, res: any) => {
  const { counter, date, id } = req.body;

  const query = "UPDATE berichte SET counter = $1, date = $2 WHERE id = $3";
  try {
    await client.query(query, [counter, date, id]); // sends queries
    res.status(201).send({ message: "data modified!" });
  } catch (error: any) {
    console.error(error.stack);
    return false;
  }
};

export default updateData;
