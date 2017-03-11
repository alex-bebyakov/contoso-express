import * as _ from 'lodash';
import {IAppError, AppErrorOptions} from "../index";

export class AppError implements IAppError,AppErrorOptions {
    message = '';
    type = '';
    code = '';
    uiShow = true;
    log = false;
    isAppError = true;
    data: Object;
    constructor(message: string, options?: Object);
    constructor(type: string, code: string, options?: Object);
    constructor(...args: any[]) {
        Error.captureStackTrace(this, this.constructor);
        if (_.isString(args[0]) && _.isString(args[1])) {
            this.type = args[0];
            this.code = args[1];
            _.merge(this, args[2]);
        }
        else if (_.isString(args[0])) {
            this.message = args[0];
            _.merge(this, args[1]);
        } else {
            throw new Error('Использован недопустимый конструктор для класса appError');
        }
    }
}

export default AppError;