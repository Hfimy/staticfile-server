module.exports = {
    "env": {
        // "browser": true,
        "node":true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parser":"babel-eslint",
    "rules": {
        //缩进，4个空格
        "indent": [
            "error",
            4
        ],
        //换行
        "linebreak-style": [
            "error",
            "windows"
        ],
        //引号
        "quotes": [
            "warn",
            "single"
        ],
        //分号
        "semi": [
            "warn",
            "always"
        ]
    }
};
