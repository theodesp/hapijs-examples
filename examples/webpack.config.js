const path = require('path');

module.exports = {
    entry: "./examples/entry.js",
    output: {
        path: path.join(__dirname, '../public'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
