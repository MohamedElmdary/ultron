import {IArg} from "./arg";
import {LoggerMessage} from "@ultron/logger";
import {Cli, Command, Flag} from "../modules";

interface ICommandFuncOptions {
  args: IArg[];
  cli: Cli;
  command?: Command;
}

interface ICommand {
  name: string;
  description: string;
  args?: IArg[];
  flags?: Flag[];
  func: (options: ICommandFuncOptions) => LoggerMessage | void;
}

export {ICommand};
