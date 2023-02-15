var path = require('path');


module.exports = {
    mode: 'development',
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
      },
      {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      ],
    },
    watch: (process.argv.indexOf('--no-watch') > -1) ? false : true,
    entry: {
       'index': path.resolve('./src/index.tsx'),
    },
    output: {
        filename: 'bundled.[name].js',
        path: path.resolve("../backend/public/dist")
    }
};