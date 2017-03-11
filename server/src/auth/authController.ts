import {Strategy as LocalStrategy} from 'passport-local';
import userRepository from "../repositories/userRepository";
import {IUserModel} from "../../index";
import {IUser} from "../../../index";
import validationHelper from "../helpers/validationHelper"
import authHelper from "../helpers/authHelper"
import cryptoHelper from "../helpers/cryptoHelper"
import {AppError} from "../appError";
import errorHelper from "../helpers/errorHelper"


export default function init(passport) {
    let strategySettings = {
        passReqToCallback: true
    };
    passport.use('local-signup', new LocalStrategy(strategySettings, signUpPostLocal));
    passport.use('local-login', new LocalStrategy(strategySettings, logInPostLocal));
    return {
        signUpPost: signUpPost(passport),
        logInPost: logInPost(passport),
        activate:activateProfile
    }
}

async function logInPostLocal(...args) {
    let username = args[0].body.username
    let password = args[0].body.password
    let done = args[3]
    let findUser = null
    try {
        await validationHelper.validateEmail(username)
        findUser = await userRepository.findUserByEmail(username)
        if (findUser) {

            return authHelper.checkProfile(password, findUser, done)
        }
        return authHelper.getAuthError(new Error(), done, 'Error', 'email_not_found')
    }
    catch (error) {
        try {
            findUser = await userRepository.findUserByName(username)
            if (findUser) {

                return authHelper.checkProfile(password, findUser, done)
            }
            return authHelper.getAuthError(new Error(), done, 'Error', 'user_not_found')
        }
        catch (error) {
            return authHelper.getAuthError(error, done, 'UnknownError', '')
        }
    }
}

async function signUpPostLocal(...args) {
    let user: IUser = args[0].body
    let done = args[3]
    user.email = user.email.toLowerCase()
    try {
        return await createProfile(await validationHelper.validateUser(user), done)
    }
    catch (error) {
        return authHelper.getAuthError(error, done, 'ValidationError', 'request_validation')
    }
}

function logInPost(passport) {
    return function (request, response, next) {
        passport.authenticate('local-login', (error, user, info) => {
            return error
                ? next(error)
                : user
                    ? request.logIn(user, (error) => {
                        return error
                            ? next(error)
                            : response.status(200).send({token: 'userLogged'});
                    })
                    : response.status(200).send(info);
        })(request, response, next)
    }
}

function signUpPost(passport) {
    return function (request, response, next) {
        passport.authenticate('local-signup', (error, user, info) => {
            return error
                ? next(error)
                : user
                    ? response.status(200).send({token: 'userCreated'})
                    : response.status(200).send(info);
        })(request, response, next)
    }
}

async function activateProfile(request, response){
    try {
        let user:IUserModel= await userRepository.findUserByToken(request.params.token)
        if (user.isActivated()){
            response.status(200).send({message: errorHelper.getAppErrorMessage(new AppError('auth', 'already_activate'))});
        }
        else if(!authHelper.isProfileUpToDate(user.created())){
            user=await userRepository.updateToken(user.activationToken())
            if(!await authHelper.sendActivationEmail(user)){
                //ToDo:Добавить логгирование ошибки при отправке почты
            }
            response.status(200).send({message: errorHelper.getAppErrorMessage(new AppError('auth', 'profile_not_up_to_date'))});
        }
        else if(!await userRepository.activateUser(user.activationToken())){
            response.status(200).send({message: errorHelper.getAppErrorMessage(new AppError('auth', 'activation_failed'))});
        }
        else{
            response.status(200).send({token: 'profileActivated'});
        }
    }
    catch (error) {
        response.status(200).send({message: errorHelper.getAppErrorMessage(new AppError('auth', 'token_not_found'))});
    }
}

async function createProfile(user: IUser, done) {
    try {
        if (await userRepository.findUserByName(user.username)) {
            return authHelper.getAuthError(new Error(), done, 'Error', 'username already exist')
        }
        else if (await userRepository.findUserByEmail(user.email)) {
            return authHelper.getAuthError(new Error(), done, 'Error', 'email already exist')
        }
        user.password = cryptoHelper.generateHash(user.password)
        let profile= await userRepository.createUser(user)
        if(!await authHelper.sendActivationEmail(profile)){
            await userRepository.deleteUser(user.username)
            return authHelper.getAuthError(new Error(), done, 'Error', 'activation_email_sending_failed')
        }
        return done(null, profile)
    }
    catch (error) {
        return authHelper.getAuthError(new Error(), done, 'Error', 'account_creation_failed')
    }
}





