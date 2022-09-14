import {ICommand} from "./command";

interface IFlag extends ICommand {
  alias: string;
}

export {IFlag};
