import CompressionPlugin from 'compression-webpack-plugin';

module.exports = {
  plugins: [
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.tsx$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(tsx|css|html|svg)$/,
      compressionOptions: {
        level: 11,
      },
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};
