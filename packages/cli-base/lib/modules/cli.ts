import {Logger, LoggerMessage} from "@ultron/logger";
import {Optional} from "utility-types";

import {CliOptions} from "../types";
import {Command} from "./command";
import {Flag} from "./flag";

const HELP_CMD = new Command({
  name: "help",
  description: "List all available commands, flags for this command.",
  func({cli}) {
    return cli.format();
  },
});

const HELP_FLAG = new Flag({
  name: "help",
  alias: "h",
  description: "List all available commands, flags for this command.",
  func({cli, command}) {
    if (command) return cli.formatCommand(command);
    return cli.format();
  },
});

export class Cli {
  private logger: Logger = Logger.create();

  private name: string;
  private commands: Command[];
  private flags: Flag[];
  private help: boolean;

  private constructor(options: CliOptions) {
    this.name = options.name;
    this.commands = options.commands.map((cmd) => {
      if (this.enableHelp) cmd.flags.unshift(HELP_FLAG);
      return cmd;
    });
    this.flags = options.flags;
    this.help = options.help;

    if (this.enableHelp) {
      this.commands.unshift(HELP_CMD);
      this.flags.unshift(HELP_FLAG);
    }
  }

  private get enableHelp(): boolean {
    return this.help === true;
  }

  async init(): Promise<void> {
    const args = process.argv.slice(2);

    if (!args.length) {
      this.logger.log([
        LoggerMessage.create("No arguments were passed. check --help,-h for more info.")
          .red()
          .newLine(),
      ]);
      return;
    }

    let command = args[0];

    if (command.startsWith("-") || command.startsWith("--")) {
      command = command.replace(/-/g, "");
      const flag = this.flags.find((f) => f.alias === command || f.name === command);

      const maybeHelp = args[args.length - 1];
      if (maybeHelp === "-h" || maybeHelp === "--help") {
        this.logger.log([await HELP_FLAG.func({cli: this, args: []})]);
        return;
      }

      if (!flag) {
        this.logger.log([
          LoggerMessage.create(`Unknown flag ${command}, check --help,-h for more info.`)
            .red()
            .newLine(),
        ]);
        return;
      }

      // if (command.length - 1 > flag.args.length) {
      //   return this.logger.log([
      //     LoggerMessage.create(
      //       `${command} accepts at most ${flag.args.length}, check --help,-h for more info.`
      //     )
      //       .red()
      //       .newLine(),
      //   ]);
      // }

      this.logger.log([await flag.func({cli: this, args: args.slice(1)})]);
    }

    const cmd = this.commands.find((c) => c.name === command);

    if (!cmd) {
      this.logger.log([
        LoggerMessage.create(`Unknown command ${command}, check --help,-h for more info.`)
          .red()
          .newLine(),
      ]);
      return;
    }

    const maybeHelp = args[args.length - 1];
    if (maybeHelp === "-h" || maybeHelp === "--help") {
      this.logger.log([await HELP_FLAG.func({cli: this, command: cmd, args: []})]);
      return;
    }

    // if (command.length - 1 > cmd.args.length) {
    //   return this.logger.log([
    //     LoggerMessage.create(
    //       `${command} accepts at most ${cmd.args.length}, check --help,-h for more info.`
    //     )
    //       .red()
    //       .newLine(),
    //   ]);
    // }

    this.logger.log([await cmd.func({cli: this, args: args.slice(1)})]);
  }

  addCommands(...cmds: Command[]): Cli {
    this.commands.push(...cmds);
    return this;
  }

  addFlags(...flags: Flag[]): Cli {
    this.flags.push(...flags);
    return this;
  }

  format(cmd: Cli | Command | Flag = this): LoggerMessage {
    if (cmd instanceof Command) return this.formatCommand(cmd);
    if (cmd instanceof Flag) return this.formatFlag(cmd);

    let commands: LoggerMessage[] = [];
    let flags: LoggerMessage[] = [];

    if (cmd.commands.length) {
      const cmds = cmd.commands.map(this.formatCommand.bind(this));
      commands = [
        LoggerMessage.create("Commands:").blue().newLine(),
        LoggerMessage.create(cmds).newLine().newLine(),
      ];
    }

    if (cmd.flags.length) {
      const flgs = cmd.flags.map(this.formatFlag.bind(this));
      flags = [
        LoggerMessage.create("Flags:").blue().newLine(),
        LoggerMessage.create(flgs).newLine(),
      ];
    }

    return LoggerMessage.create([
      LoggerMessage.create(this.name).red().newLine().newLine(),
      ...commands,
      ...flags,
    ]);
  }

  formatCommand(cmd: Command): LoggerMessage {
    return this.__formatFlagOrCommand(cmd);
  }

  formatFlag(flag: Flag): LoggerMessage {
    return this.__formatFlagOrCommand(flag);
  }

  formatArgs(args: Command["args"]): LoggerMessage {
    const loggerArgs = args.map((arg) => {
      return LoggerMessage.create(` [${arg.name}]`);
    });
    return LoggerMessage.create(loggerArgs).red();
  }

  private __formatFlagOrCommand(cmd: Command | Flag): LoggerMessage {
    let name: string = " " + cmd.name;
    if (cmd instanceof Flag) name = " --" + cmd.name + ",-" + cmd.alias;

    let flags: LoggerMessage[] = [];

    if (cmd instanceof Command && cmd.flags.length) {
      flags = [
        LoggerMessage.create(
          "(" + cmd.flags.map((f) => `--${f.name}, -${f.alias}`).join(" | ") + ")"
        ),
      ];
    }

    return LoggerMessage.create([
      LoggerMessage.create("  " + this.name).white(),
      LoggerMessage.create(name).cyan(),
      this.formatArgs(cmd.args),
      ...flags,
      LoggerMessage.create(" " + cmd.description).white(),
    ]).newLine();
  }

  static create(options: Optional<CliOptions, "commands" | "flags" | "help">): Cli {
    return new Cli({
      name: options.name,
      commands: options.commands || [],
      flags: options.flags || [],
      help: options.help || true,
    });
  }
}
