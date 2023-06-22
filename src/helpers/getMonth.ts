export const getCurrentMonth = () => {
  const month = new Date().toLocaleString("de-de", { month: "long" });
  return month;
};
