
import {hashSync, compareSync, genSaltSync} from "bcrypt-nodejs";

export default {
    generateHash,
    comparePasswords,
};

function generateHash(password): string {
    return (hashSync(password,genSaltSync(8)).trim())
};

function comparePasswords(password:string,hash:string): boolean {
    return compareSync(password,hash)
};