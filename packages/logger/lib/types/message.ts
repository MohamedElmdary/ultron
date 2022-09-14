import {LoggerMessage} from "../modules";
import {BackgroundsMixin, ColorsMixin, SystemMixin} from "../utils";

type Mixins = LoggerMessage & ColorsMixin & BackgroundsMixin & SystemMixin;

interface LoggerMessageModel extends Mixins {}

export {LoggerMessageModel};
