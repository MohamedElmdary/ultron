import {IFlag} from "../types";
import {Command} from "./command";

class Flag extends Command {
  public alias: string;

  constructor(options: IFlag) {
    super(options);
    this.alias = options.alias;
  }

  static create(options: IFlag): Flag {
    return new Flag(options);
  }
}

export {Flag};
