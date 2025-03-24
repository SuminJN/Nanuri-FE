import {itemHandler} from "./itemHandler";
import {userHandler} from "./userHandler";
import {historyHandler} from "./historyHandler";

export const handlers = [
    ...itemHandler,
    ...userHandler,
    ...historyHandler,
];