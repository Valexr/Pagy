const DEV = process.env.NODE_ENV === 'dev';

module.exports = {
    map: DEV,
    plugins: [
        require('postcss-url')(),
        require('postcss-easy-import')({
            prefix: '_',
            extensions: ['.scss', '.css']
        }),
        require('precss')(),
        require('postcss-preset-env'),
        require('postcss-flexbugs-fixes'),
        !DEV && require('autoprefixer'),
    ]
};