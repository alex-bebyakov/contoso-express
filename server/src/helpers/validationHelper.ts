import * as Joi from 'joi';
import {IUser} from "../../../index";

export default {
    validateUser,
    validateEmail
};

function validateUser (user:IUser):Promise<IUser> {
    let schema =Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().min(8).max(30).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        email: Joi.string().lowercase().email().required(),
    })
    return validate(user,schema)
}

function validateEmail(email):Promise<any>{
    email.toLowerCase()
    let schema =Joi.string().email().required()
    return validate(email,schema)
}

function validate(obj,schema):Promise<any>{
    return new Promise(function (resolve, reject) {
        Joi.validate(obj, schema, function (error, value) {
            if (!error) return resolve(value);
            return reject(error);
        });
    });
}
