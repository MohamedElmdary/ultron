import {Mixin} from "ts-mixer";
import {ColorsMixin, BackgroundsMixin, SystemMixin} from "../utils";

class LoggerMessage extends Mixin(ColorsMixin, BackgroundsMixin, SystemMixin) {
  protected message: string;

  constructor(message: string | LoggerMessage[]) {
    super();

    this.message =
      typeof message === "string" ? message : message.reduce((cmd, msg) => cmd + msg.message, "");
  }

  get value(): string {
    return this.__reset();
  }

  static create(msg: string | LoggerMessage[]): LoggerMessage {
    return new LoggerMessage(msg);
  }
}

export {LoggerMessage};
