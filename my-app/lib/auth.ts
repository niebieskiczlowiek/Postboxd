import { genSaltSync, hash, compare } from "bcrypt-ts"

const SALT = genSaltSync(10);

export const hashPassword = async (password: string): Promise<string> => {
    const hashed = await hash(password, SALT);
    return hashed;
}

export const comparePassword = async (password: string, pwdHash: string): Promise<boolean> => {
    const result = await compare(password, pwdHash);
    return result;
}