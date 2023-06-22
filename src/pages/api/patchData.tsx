import fs from "fs";
import path from "path";

export const buildDataPath = () => {
  return path.join(process.cwd(), "data.json");
};

export const extractData = (filePath: string) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData.toString("utf-8"));
  return data;
};

export default function handler(req: any, res: any) {
  const stunden = req.body.hours;

  const newFeedback = [
    {
      hours: stunden
    }
  ];

  const filePath = path.join(process.cwd(), "data.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData.toString("utf-8"));
  console.log(data);
  fs.writeFileSync(filePath, JSON.stringify(newFeedback, null, 2));

  res.status(201).json({ message: "Daten wurden gespeichert!" });
}
