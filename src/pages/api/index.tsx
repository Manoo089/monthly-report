const wbm = require("wbm");

export default function handler(req: any, res: any) {
  const date = new Date();
  date.toDateString();
  const day = date.getDate();

  if (day === 24) {
    wbm
      .start()
      .then(async () => {
        const phones = ["4917623564344"];
        const message = "Hello from NodeJS";
        await wbm.send(phones, message);
        await wbm.end();
        await res.end();
      })
      .catch((err: any) => console.log(err));
  } else {
    res.end();
    }
}
