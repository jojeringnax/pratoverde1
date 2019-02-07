const path = require('path');

module.exports = {
    entry: './public/js/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    devServer: { historyApiFallback: true, contentBase: './', hot: true }
};