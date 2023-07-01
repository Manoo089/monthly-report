export const findElement = (data: any, name: string) => {
  return data.find((e: any) => e.name === name);
};
