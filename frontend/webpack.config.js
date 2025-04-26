// webpack.config.ts
const path = require("path");

module.exports = {
    name: "project-name", 
    mode: 'development', // 배포 : production
    devtool: "inline-source-map", // hidden-source-map
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"], // 추가!
    },
    // client.jsx를 대상으로 웹팩이 빌드를 수행
    entry: {
      app: "./src/index.tsx", // 경로 수정!
    },
    module: {
      rules: [
        {
          // babel-loader를 이용해 규칙에 적용
          test: /\.jsx?/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { importLoaders: 1 },
            },
            "postcss-loader",
          ],
        },
         // TypeScript용 loader도 추가돼 있으면 좋아!
      
      ],
    },
    // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
    output: {
      path: path.join(__dirname, "dist"),
      filename: "app.js",
    },
  };

  