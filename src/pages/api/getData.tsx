// import fs from "fs";
// import path from "path";

// export const buildDataPath = () => {
//   return path.join(process.cwd(), "data.json");
// };

// export const extractData = (filePath: string) => {
//   const fileData = fs.readFileSync(filePath);
//   const data = JSON.parse(fileData.toString("utf-8"));
//   return data;
// };

// export const extractStunden = (data: any) => {
//   return data[0].hours;
// };

// export default function handler(req: any, res: any) {
//   const filePath = buildDataPath();
//   const data = extractData(filePath);
//   res.status(200).json(data);
// }
