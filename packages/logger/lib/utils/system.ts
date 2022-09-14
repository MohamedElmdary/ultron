import {LoggerMessageModel} from "../types";

enum System {
  reset = "\x1b[0m",
  bold = "\x1b[1m",
  italic = "\x1b[3m",
  underscore = "\x1b[4m",
  strikethrough = "\x1b[9m",
  newLine = "\n",
}

// prettier-ignore
abstract class SystemMixin {
  bold(this: LoggerMessageModel) { return this.__system(System.bold); }
  italic(this: LoggerMessageModel) { return this.__system(System.italic); }
  underscore(this: LoggerMessageModel) { return this.__system(System.underscore); }
  strikethrough(this: LoggerMessageModel) { return this.__system(System.strikethrough); }

  newLine(this: LoggerMessageModel) {
    this.message += System.newLine;
    return this;
  }

  protected __reset(this: LoggerMessageModel): string {
    return this.message + System.reset;
  }

  private __system(this: LoggerMessageModel, cmd: System): LoggerMessageModel {
    this.message = cmd + this.message + cmd;
    return this;
  }
}

export {System, SystemMixin};
