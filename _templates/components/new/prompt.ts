const hygenConfig = [
  {
    type: "select",
    name: "folder",
    message: "Pick a package where you want to create the component",
    choices: ["components", "container"],
  },
  {
    type: "input",
    name: "parent",
    message: "What is the parent component? (default: same as the provided name)",
  },
];

module.exports = hygenConfig;
