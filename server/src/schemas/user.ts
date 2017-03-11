import {Schema, Model, model} from "mongoose";
import {IUserModel} from "../../index";

export var UserSchema: Schema = new Schema({
    createdAt: Date,
    activated:{
        type: Boolean,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    token:{
        type:String,
        required:true
    }
});
UserSchema.pre("save",next => {
    next();
});
UserSchema.methods.isActivated = function (): string {
    return this.activated;
};

UserSchema.methods.activationToken = function (): string {
    return this.token;
};
UserSchema.methods.created = function ():Date {
    return this.createdAt;
};

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
