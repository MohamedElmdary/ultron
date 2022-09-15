import {Command, Flag} from "../modules";

interface CliOptions {
  name: string;
  commands: Command[];
  flags: Flag[];
  help: boolean;
}

export {CliOptions};
