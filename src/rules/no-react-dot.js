// src/rules/no-react-dot.js

/** @typedef {import('eslint').Rule.RuleModule} RuleModule */

/** @type {RuleModule} */
export const rule = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Forbids using React hooks via the React namespace (e.g., React.useState) and encourages direct imports instead.",
      recommended: false,
    },
    fixable: "code",
    hasSuggestions: true,
    schema: [
      {
        type: "object",
        properties: {
          hooks: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noReactDot:
        'Use "{{name}}" directly instead of "React.{{name}}".',
    },
  },

  create(context) {
    const options = context.options?.[0] ?? {};
    const defaultHooks = [
      "useState",
      "useEffect",
      "useContext",
      "useReducer",
      "useMemo",
      "useCallback",
      "useRef",
      "useLayoutEffect",
      "useImperativeHandle",
      "useTransition",
      "useDeferredValue",
      "useId",
      "useSyncExternalStore",
    ];

    const hooks = new Set(options.hooks ?? defaultHooks);

    return {
      MemberExpression(node) {
        if (
          node.object.type === "Identifier" &&
          node.object.name === "React" &&
          node.property.type === "Identifier" &&
          hooks.has(node.property.name)
        ) {
          const hookName = node.property.name;

          context.report({
            node,
            messageId: "noReactDot",
            data: { name: hookName },
            fix(fixer) {
              return fixer.replaceText(node, hookName);
            },
            suggest: [
              {
                desc: `Use "${hookName}" directly instead of "React.${hookName}".`,
                fix(fixer) {
                  return fixer.replaceText(node, hookName);
                },
              },
            ],
          });
        }
      },
    };
  },
};
