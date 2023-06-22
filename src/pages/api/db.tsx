import mongodb from "../../utils/mongodb";
import jsondb from "../../../data";
import dbModels from "../../models/dbModels";

export default async function handler(req: any, res: any) {
  await mongodb.dbConnect();
  await dbModels.deleteMany();
  await dbModels.insertMany(jsondb.reach);
  const data = await dbModels.find({});
  await mongodb.dbDisconnect();
  res.send(data);
}
