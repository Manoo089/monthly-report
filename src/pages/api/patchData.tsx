import mongoose from "mongoose";
import dbModels from "../../models/dbModels";
import mongodb from "../../utils/mongodb";

export default async function handler(req: any, res: any) {
  const { method } = req;
  await mongodb.dbConnect();

  console.log(method);
  const stunden = req.body.hours;

  if (method === "PATCH") {
    try {
      await dbModels.find({});
      await dbModels.updateOne({ hours: stunden });
    } finally {
      res.send(JSON.stringify("Erfolgreich geupdated"));
    }
  }
}
