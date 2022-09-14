import {LoggerMessage} from "./message";

class Logger {
  message(msg: string): LoggerMessage {
    return new LoggerMessage(msg);
  }

  log(messages: LoggerMessage[], buffer: (msg: string) => void = console.log.bind(console)): this {
    const msg = messages.reduce((cmd, msg) => cmd + msg.value, "");
    buffer(msg);
    return this;
  }
}

export {Logger};
