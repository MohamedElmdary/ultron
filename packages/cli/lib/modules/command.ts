import {IArg, ICommand} from "../types";

class Command {
  public name: string;
  public description: string;
  public args: IArg[];
  public func: ICommand["func"];

  constructor(options: ICommand) {
    this.name = options.name;
    this.description = options.description;
    this.args = options.args || [];
    this.func = options.func;
  }

  static create(options: ICommand): Command {
    return new Command(options);
  }
}

export {Command};
