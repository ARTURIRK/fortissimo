const path = require("path"); // модуль для работы с путями
const HTMLWebpackPlugin = require("html-webpack-plugin"); // плагин для работы с html
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // очищение ненужных файлов после сборки
const CopyWebpackPlugin = require("copy-webpack-plugin"); //копирование
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // сжатие css
const isDev = process.env.NODE_ENV === "development"; // проверка на режим (разработка или прод)
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // оптимизация css
const TerserPlugin = require("terser-webpack-plugin");
const isProd = !isDev;
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);
const cssLoaders = (extra) => {
  // сахар - добавление стиль - лоадеров
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    "css-loader",
  ];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};
const optimization = () => {
  // функция оптимизации css и js на проде
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };
  if (isProd) {
    config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()];
  }
  return config;
};
const babelOptions = (presets) => {
  const opts = {
    presets: ["@babel/preset-env"],
  };
  if (presets) {
    opts.presets.push(presets);
  }
  return opts;
};
module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: ["@babel/polyfill", "./index.js"],
  }, // путь до входного файла
  output: {
    // выходной файл
    filename: filename("js"), // обычно файл называется bundle
    path: path.resolve(__dirname, "dist"), // куда положить выходной файл
  },
  resolve: {
    extensions: [".js", ".json"], // стандартные расширения для файлов при сборке
    alias: {
      // сокращение путей
      "@models": path.resolve(__dirname, "src/models"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  // devtool: isDev ? "source-map" : "",
  optimization:
    // оптимизация
    optimization(),
  devServer: {
    port: 4200,
    hot: isDev,
  },
  plugins: [
    // подкл плагинов
    new HTMLWebpackPlugin({
      template: "./index.html", // настройка шаблона, на основе которого webpack создаст свой html
      minify: {
        collapseWhitespace: isProd, // оптимизация html
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/i,
        type: "asset/inline",
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.mp3$/,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions(),
        },
      },
    ],
  },
};
