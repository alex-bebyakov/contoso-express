import cryptoHelper from ".//cryptoHelper"
import errorHelper from ".//errorHelper"
import {AppError} from "../appError";
import {IUserModel, EmailTemplateData} from "../../index";
import config from "../config"
import emailHelper from ".//emailHelper"
import * as moment from 'moment';

export default {
    checkProfile,
    getAuthError,
    sendActivationEmail,
    isProfileUpToDate
};

function checkProfile(password, user:IUserModel, done) {
    if (!cryptoHelper.comparePasswords(password, user.password)) {
        return getAuthError(new Error(), done, 'Error', 'wrong_password')
    }
    if(!user.isActivated()){
        return getAuthError(new Error(), done, 'Error', 'not_activated')
    }
    return done(null, user)
}

function getAuthError(error, done, errorName, key) {
    let appError = null;
    let validationMessage = error
    error.name !== errorName
        ? appError = new AppError('app', 'server')
        : errorName !== 'ValidationError'
            ? appError = new AppError('auth', key)
            : appError = new AppError('auth', key, {
                data: {validationMessage}
            })
    return done(null, false, {message: errorHelper.getAppErrorMessage(appError)})
}

async function sendActivationEmail(profile:IUserModel){
    let userData:EmailTemplateData={
        name:profile.username,
        site:config.app.appName,
        token:profile.activationToken(),
        rootUrl:config.app.rootUrl
    }
    try{
       return await emailHelper.sendEmail("auth",userData,profile.email)
    }
    catch(error){

    }

}

function isProfileUpToDate(creationDate:Date){
    return moment(new Date()).diff(creationDate,'hours')<24
}



