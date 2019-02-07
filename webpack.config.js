const path = require('path');

module.exports = {
    entry: './public/js/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    performance: {
        maxEntrypointSize: 2048000,
        maxAssetSize: 2048000
    },
    devServer: { historyApiFallback: true, contentBase: './', hot: true }
};