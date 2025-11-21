import { RuleTester } from "eslint";
import { rule as noReactDotRule } from "../src/rules/no-react-dot.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-react-dot", noReactDotRule, {
  valid: [
    {
      code: `
        import { useState } from "react";
        const [count, setCount] = useState(0);
      `,
    },
    {
      code: `
        import React from "react";
        const el = React.createElement("div", null);
      `,
    },
  ],

  invalid: [
    {
      code: `
        import React from "react";
        const [count, setCount] = React.useState(0);
      `,
      errors: [
        {
          messageId: "noReactDot",
          suggestions: 1,
        },
      ],
      output: `
        import React from "react";
        const [count, setCount] = useState(0);
      `,
    },
  ],
});
