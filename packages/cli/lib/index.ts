import {LoggerMessage} from "@ultron/logger";
import {Flag, Command, Cli} from "./modules";

const ver = Command.create({
  name: "version",
  description: "Output current version of cli.",
  args: [{name: "type", description: "Show more details if needed <default | detailed>"}],
  func() {
    return LoggerMessage.create("v1.0.0");
  },
});

const help = Flag.create({
  name: "help",
  alias: "h",
  description: "Output all available commands, flags in cli.",
  func() {
    return LoggerMessage.create("help me!");
  },
});

const cli = Cli.create("ng").addCommand(ver).addFlag(help);

cli.print();
