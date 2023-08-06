const path = require('path');

module.exports = function (env = {}) {
    return {
        mode: env.production ? 'production' : 'development',
        entry: './src/index',
        output: {
            path: path.resolve(__dirname, 'js'),
            filename: 'app.js',
            publicPath: '/js/',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/,
                    loader: 'file-loader',
                },
            ],

            /* Advanced module configuration (click to show) */
        },
        devServer: {
            static: {
                directory: path.join(__dirname, '.'),
            },
            compress: true,
            port: 9000,
            // ...
        },

        plugins: [
            // ...
        ],
    };
};