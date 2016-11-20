module.exports = {
    entry: "./script/app.js",
    output: {
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