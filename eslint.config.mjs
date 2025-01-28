import globals from "globals";
import pluginJs from "@eslint/js";

export default [
	pluginJs.configs.recommended,
	{
    	languageOptions: {
    		globals: globals.browser
    	},
    },
    {
    	rules: {
    		"array-callback-return": "warn",
    		"no-constructor-return": "warn",
    		"no-duplicate-imports": "warn",
    		"no-inner-declarations": "warn",
    		"no-promise-executor-return": "warn",
    		"no-self-compare": "warn",
    		"no-template-curly-in-string": "warn",
    		"no-unmodified-loop-condition": "warn",
    		"no-unreachable-loop": "warn",
    		"no-useless-assignment": "warn",
    		"require-atomic-updates": "warn",
    		"arrow-body-style": "warn",
    		"block-scoped-var": "warn",
    		"complexity": ["warn", 20],
    		"curly": "warn",
    		"default-case": "warn",
    		"default-case-last": "warn",
    		"default-param-last": "warn",
    		"dot-notation": "warn",
    		"eqeqeq": "warn",
    		"func-name-matching": "warn",
    		"func-style": ["warn", "declaration"],
    		"guard-for-in": "warn",
    		"max-depth": "warn",
    		"max-nested-callbacks": "warn",
    		"no-alert": "warn",
    		"new-cap": "warn",
    		"no-array-constructor": "warn",
    		"no-caller": "warn",
			"no-div-regex": "warn",
			"no-empty-function": "warn",
			"no-eq-null": "warn",
			"no-eval": "warn",
			"no-extend-native": "warn",
			"no-extra-bind": "warn",
			"no-extra-label": "warn",
			"no-implicit-coercion": "warn",
			"no-implicit-globals": "warn",
			"no-implied-eval": "warn",
			"no-invalid-this": "warn",
			"no-iterator": "warn",
			"no-label-var": "warn",
			"no-labels": "warn",
			"no-lone-blocks": "warn",
			"no-lonely-if": "warn",
			"no-loop-func": "warn",
			"no-new": "warn",
			"no-new-func": "warn",
			"no-new-wrappers": "warn",
			"no-object-constructor": "warn",
			"no-param-reassign": "warn",
			"no-proto": "warn",
			"no-return-assign": "warn",
			"no-script-url": "warn",
			"no-sequences": "warn",
			"no-shadow": "warn",
			"no-throw-literal": "warn",
			"no-undef-init": "warn",
			"no-unneeded-ternary": "warn",
			"no-unused-expressions": "warn",
			"no-useless-call": "warn",
			"no-useless-computed-key": "warn",
			"no-useless-concat": "warn",
			"no-useless-constructor": "warn",
			"no-useless-rename": "warn",
			"no-var": "warn",
			"no-void": "warn",
			"prefer-arrow-callback": "warn",
			"prefer-const": "warn",
			"prefer-destructuring": "warn",
			"prefer-exponentiation-operator": "warn",
			"prefer-numeric-literals": "warn",
			"prefer-object-has-own": "warn",
			"prefer-object-spread": "warn",
			"prefer-promise-reject-errors": "warn",
			"prefer-rest-params": "warn",
			"prefer-spread": "warn",
			// "prefer-template": "warn",
			"radix": "warn",
			"require-await": "warn",
			// "sort-imports": "warn",
			"strict": "warn",
			"symbol-description": "warn",
    	}
    },
	{
        ignores: ["*.config.js", "dist/*"]
    },
    {
    	files: ["src/global.js"],
    	"rules": {
        	"no-unused-vars": ["error", {
            	"varsIgnorePattern": "THREE|planck",
        	}]
    	}    	
    },
    {
    	files: ["src/player.js", "src/objects/ball.js"],
    	"rules": {
        	"func-style": "off"
    	}    	
    },
    {
    	files: ["src/aleaPRNG.js"],
    	"rules": {
        	"no-param-reassign": "off"
    	}    	
    },
    {
    	files: ["src/mazegen.js"],
    	"rules": {
        	"no-unused-vars": ["error", {
            	"varsIgnorePattern": "generateEmptyMaze",
        	}]
    	}    	
    },
];
