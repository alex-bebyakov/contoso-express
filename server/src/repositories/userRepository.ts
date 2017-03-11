import {User} from "../schemas/user";
import {IUserModel} from "../../index";
import {IUser} from "../../../index";
import config from '../config';

var mongoose = require('mongoose');
mongoose.Promise  = require('bluebird');
const mongo_uri = process.env['MONGODB_URI']||config.db.host
mongoose.connect(mongo_uri);
const crypto = require('crypto');

export default {
    findUserById,
    findUserByName,
    findUserByEmail,
    findUserByToken,
    createUser,
    deleteUser,
    activateUser,
    updateToken
}

function findUserByName(username): Promise<IUserModel> {
    return User.findOne({username:username}).exec()
}

function findUserById(id): Promise<IUserModel> {
    return User.findOne({_id: id}).exec()
}

function findUserByEmail(email): Promise<IUserModel> {

    return User.findOne({email:email}).exec()
}

function findUserByToken(token): Promise<IUserModel> {
    return User.findOne({token:token}).exec()
}

function createUser(user:IUser): Promise<IUserModel> {
    return new User({
        username:user.username,
        password:user.password,
        email:user.email,
        createdAt: new Date(),
        activated:false,
        token: generateToken()
    }).save()
}

function deleteUser(username): Promise<IUserModel> {
    return User.findOneAndRemove({username:username}).exec()
}

function updateToken(token): Promise<IUserModel>{
    return User.findOneAndUpdate({token:token},{$set:{token:generateToken()}},{new:true}).exec()

}

function activateUser(token): Promise<boolean>{
    return User.findOneAndUpdate({token:token},{$set:{activated:true}},{new:true}).exec()
        .then(()=>{return true})
        .catch(()=>{return false})

}


function generateToken(){
    return crypto.randomBytes(32).toString('hex')
}