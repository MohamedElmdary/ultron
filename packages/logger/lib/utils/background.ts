import {LoggerMessageModel} from "../types";

enum Backgrounds {
  black = "\x1b[40m",
  red = "\x1b[41m",
  green = "\x1b[42m",
  yellow = "\x1b[43m",
  blue = "\x1b[44m",
  magenta = "\x1b[45m",
  cyan = "\x1b[46m",
  white = "\x1b[47m",
}

// prettier-ignore
abstract class BackgroundsMixin {
  bgBlack(this: LoggerMessageModel) { return this.__background(Backgrounds.black); }
  bgRed(this: LoggerMessageModel) { return this.__background(Backgrounds.red); }
  bgGreen(this: LoggerMessageModel) { return this.__background(Backgrounds.green); }
  bgYellow(this: LoggerMessageModel) { return this.__background(Backgrounds.yellow); }
  bgBlue(this: LoggerMessageModel) { return this.__background(Backgrounds.blue); }
  bgMagenta(this: LoggerMessageModel) { return this.__background(Backgrounds.magenta); }
  bgCyan(this: LoggerMessageModel) { return this.__background(Backgrounds.cyan); }
  bgWhite(this: LoggerMessageModel) { return this.__background(Backgrounds.white); }

  private __background(this: LoggerMessageModel, bg: Backgrounds): LoggerMessageModel {
    this.message = bg + this.message + bg;
    return this;
  }
}

export {Backgrounds, BackgroundsMixin};
