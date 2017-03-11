import {Document} from "mongoose";
import {IUser} from "../index"
export interface IConfigValues {
    app?: {
        appName: string,
        isDevLocal: boolean,
        logErrors: boolean,
        rootUrl: string
    },
    email?: {
        host:string,
        port:number,
        secure:boolean,
        auth: {
            user: string,
            pass: string
        }
    },
    db?: {
        host: string,
        dbName: string,
        username: string,
        password: string
    },
    web?: {
        port: number,
        sessionSecret: string
    },
    resource?:string,
    format?: {
        date: string,
        year: string,
        currencySymbol: string
    }
}
export interface IAppError {
    uiShow?: boolean;
    log?: boolean;
    type?: string;
    code?: string;
    data?: Object;
    message?: string;
    isAppError?: boolean;
}

export interface AppErrorOptions {
    uiShow?: boolean,
    log?: boolean,
    data?: Object
}

export interface IUserModel extends IUser, Document {
    isActivated(): string;
    activationToken():string;
    created():Date
}

export interface EmailOptions {
    from: string,
    to: string,
    subject?: string,
    text?: string,
    html?: string
}

export interface EmailTemplateData{
    name:string,
    site:string,
    token:string,
    rootUrl:string
}