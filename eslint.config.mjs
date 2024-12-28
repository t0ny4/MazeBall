import globals from "globals";
import pluginJs from "@eslint/js";

export default [
	{
    	languageOptions: {
    		globals: globals.browser
    	},
    },
	{
        ignores: ["*.config.js", "dist/*"]
    },
    {
    	files: ["src/global.js", "src/player.js"],
    	"rules": {
        	"no-unused-vars": ["error", {
            	"varsIgnorePattern": "THREE|planck",
        	}]
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
    pluginJs.configs.recommended,
];
