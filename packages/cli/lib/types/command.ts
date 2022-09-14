import {IArg} from "./arg";
import {LoggerMessage} from "@ultron/logger";

interface ICommand {
  name: string;
  description: string;
  args?: IArg[];
  func: (args: IArg[]) => LoggerMessage;
}

export {ICommand};
