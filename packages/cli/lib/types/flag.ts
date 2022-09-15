import {ICommand} from "./command";

interface IFlag extends Omit<ICommand, "flags"> {
  alias: string;
}

export {IFlag};
