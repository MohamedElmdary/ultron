import {Logger, LoggerMessage} from "@ultron/logger";
import {Command} from "./command";
import {Flag} from "./flag";

export class Cli {
  private logger: Logger = Logger.create();
  private commands: Command[] = [];
  private flags: Flag[] = [];

  constructor(private name: string) {}

  addCommand(cmd: Command): Cli {
    this.commands.push(cmd);
    return this;
  }

  addFlag(flag: Flag): Cli {
    this.flags.push(flag);
    return this;
  }

  print() {
    const commands = this.commands.map((cmd) => {
      const args = cmd.args.map((arg) => {
        return LoggerMessage.create(` [${arg.name}]`);
      });

      return LoggerMessage.create([
        LoggerMessage.create(this.name).white(),
        LoggerMessage.create(" " + cmd.name).cyan(),
        LoggerMessage.create(args).red(),
        LoggerMessage.create(cmd.description).white(),
      ]);
    });

    this.logger.log([
      LoggerMessage.create(this.name).red().newLine().newLine(),
      LoggerMessage.create("Commands:").blue().newLine(),
      LoggerMessage.create(commands),
    ]);
  }

  static create(name: string): Cli {
    return new Cli(name);
  }
}
