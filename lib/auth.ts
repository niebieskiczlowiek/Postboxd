import { genSaltSync, hash, compare } from "bcrypt-ts";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SALT = genSaltSync(10);
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export const hashPassword = async (password: string): Promise<string> => {
    const hashed = await hash(password, SALT);
    return hashed;
}

export const compareHash = async (password: string, pwdHash: string): Promise<boolean> => {
    const result = await compare(password, pwdHash);
    return result;
}

export const createToken = async (payload: JWTPayload): Promise<string> => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(SECRET)
}

export const verifyToken = async (token: string): Promise<JWTPayload | null> => {
    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload;
    } catch(error) {
        return null
    }
}

export const getSession = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) return null;

    try {
        const decoded = await verifyToken(token);
        return decoded;
    } catch {
        return null;
    }
}
