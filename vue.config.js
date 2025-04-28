const { defineConfig } = require("@vue/cli-service");
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  chainWebpack: (config) => {
    // 处理 Markdown 文件
    config.module
      .rule("markdown")
      .test(/\.md$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();

    // 生产环境优化
    if (process.env.NODE_ENV === "production") {
      // 启用 gzip 压缩
      config.plugin('compression').use(CompressionPlugin, [{
        test: /\.(js|css|html|svg)$/,
        algorithm: 'gzip',
        threshold: 10240,
        minRatio: 0.8,
      }]);

      // 分包配置
      config.optimization.splitChunks({
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // 获取包名
              const match = module.context?.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              if (!match) return 'vendor';
              const packageName = match[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 10,
          },
          // 将 Vue 相关库打包在一起
          vue: {
            test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/,
            name: 'vue-vendor',
            priority: 20,
          },
          // 将 Arco Design 相关库打包在一起
          arco: {
            test: /[\\/]node_modules[\\/]@arco-design[\\/]/,
            name: 'arco-vendor',
            priority: 30,
          },
        },
      });

      // 移除 moment.js 的本地化文件
      config.plugin('ignore')
        .use(webpack.IgnorePlugin, [{
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        }]);
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 生产环境配置
      config.mode = "production";
      config.optimization = {
        ...config.optimization,
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info'],
                passes: 2,
              },
              mangle: {
                safari10: true,
              },
              output: {
                comments: false,
                ascii_only: true,
              },
            },
            extractComments: false,
          }),
        ],
      };
    }
  },
});
