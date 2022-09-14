import {LoggerMessageModel} from "../types";

enum Colors {
  black = "\x1b[30m",
  red = "\x1b[31m",
  green = "\x1b[32m",
  yellow = "\x1b[33m",
  blue = "\x1b[34m",
  magenta = "\x1b[35m",
  cyan = "\x1b[36m",
  white = "\x1b[37m",
}

// prettier-ignore
abstract class ColorsMixin {
  black(this: LoggerMessageModel) { return this.__colorize(Colors.black); }
  red(this: LoggerMessageModel) { return this.__colorize(Colors.red); }
  green(this: LoggerMessageModel) { return this.__colorize(Colors.green); }
  yellow(this: LoggerMessageModel) { return this.__colorize(Colors.yellow); }
  blue(this: LoggerMessageModel) { return this.__colorize(Colors.blue); }
  magenta(this: LoggerMessageModel) { return this.__colorize(Colors.magenta); }
  cyan(this: LoggerMessageModel) { return this.__colorize(Colors.cyan); }
  white(this: LoggerMessageModel) { return this.__colorize(Colors.white); }

  private __colorize(this: LoggerMessageModel, color: Colors): LoggerMessageModel {
    this.message = color + this.message + color;
    return this;
  }
}

export {Colors, ColorsMixin};
