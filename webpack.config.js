module.exports = {
    entry: "./src/app.js",
    output: {
        path: "dist",
        filename: "bundle.js"
    },
    watch: true,

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};