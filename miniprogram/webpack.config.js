const path = require('path');

module.exports = function (env = {}) {
    return {
        cache: false,
        mode: env.production ? 'production' : 'development',
        entry: './src/main',
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
        },
        devServer: {
            static: {
                directory: path.join(__dirname, '.'),
            },
            compress: true,
            port: 9000,
            hot: true,
            proxy: {
                '/api': 'http://localhost:8080',
            },
            // ...
        },

        plugins: [
            // ...
        ],

    };
};
