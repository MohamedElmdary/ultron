import {LoggerMessage} from "@ultron/logger";
import {Flag, Command, Cli} from "./modules";

const ver = {
  name: "version",
  description: "Output current version of cli.",
  args: [{name: "type", description: "Show more details if needed <default | detailed>"}],
  func() {
    return LoggerMessage.create("v1.0.0");
  },
};

const help = Flag.create({
  name: "version",
  alias: "v",
  description: "Output current version of cli.",
  args: [{name: "type", description: "Show more details if needed <default | detailed>"}],
  func() {
    return LoggerMessage.create("help me!");
  },
});

// prettier-ignore
Cli
  .create({
    name: "ng",
    commands: [Command.create({...ver}), Command.create({...ver}), Command.create({...ver})],
    flags: [help, help, help],
  })
  .init();

console.log(process.argv);
