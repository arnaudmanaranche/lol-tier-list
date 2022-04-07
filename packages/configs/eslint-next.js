module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": [
      2,
      {
        groups: [
          ["^@?\\w"],
          ["design-system"],
          ["^(Contexts|Components|Utils)(/.*|$)"],
          ["^\\."],
          ["^.+\\.css$"],
        ],
      },
    ],
    "simple-import-sort/exports": 2,
  },
};
