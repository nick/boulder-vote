var config = {
    entry: [
        './src/client.js'
    ],
    devtool: 'inline-source-map',
    output: {
        filename: 'public/bundle.js',
        publicPath: '/'
    },
    module: {
        noParse: [/^react$/],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
};

module.exports = config;
