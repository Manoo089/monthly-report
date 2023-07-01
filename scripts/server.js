const wbm = require("wbm");

export const whatsAppMessage = () => {
  wbm
    .start()
    .then(async () => {
      const phones = ["4917623564344"];
      const message = "Hello from NodeJS";
      await wbm.send(phones, message);
      await wbm.end();
    })
    .catch((err: any) => console.log(err));
};
