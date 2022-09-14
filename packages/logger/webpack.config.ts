import {Configuration} from "webpack";
import path from "path";

export default {
  entry: "./lib/index.ts",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
    ],
  },
} as Configuration;
