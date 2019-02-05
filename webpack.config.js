const path = require('path');

module.exports = {
    entry: './public/js/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        historyApiFallback: true
    },
};