export const fetchMethods = (path: string, method: string, object: any) => {
  fetch(path, {
    method: method,
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(object)
  })
    .then(response => response.json())
    .then(data => console.log(data));
};
