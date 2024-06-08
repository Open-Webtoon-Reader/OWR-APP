// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "vue/html-indent": [
                "error",
                4
            ],
            "vue/script-indent": [
                "error",
                4
            ],
            "indent": [
                "error", 4,
                {
                    "SwitchCase": 1
                }
            ],
            "quotes": [
                "error",
                "double"
            ],
            "semi": [
                "error",
                "always"
            ],
            "eol-last": [
                "error",
                "always"
            ],
            "object-curly-spacing": [
                "error",
                "never"
            ],
            "no-undef": [
                "off"
            ],
            "func-style": [
                "error",
                "declaration"
            ],
            "array-bracket-spacing": [
                "error",
                "never"
            ],
            "space-infix-ops": [
                "error"
            ],
            "space-before-function-paren": [
                "error",
                "never"
            ],
            "space-in-parens": [
                "error",
                "never"
            ],
            "space-before-blocks": [
                "error",
                "never"
            ]
        }
    }
);
