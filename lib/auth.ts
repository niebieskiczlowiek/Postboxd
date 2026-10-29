import { genSaltSync, hash, compare } from "bcrypt-ts";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SALT = genSaltSync(10);
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

/*
Returns a hashed string

@param password — string (password) to hash
@return promise of hashed string (password)
*/
export const hashPassword = async (password: string): Promise<string> => {
    const hashed = await hash(password, SALT);
    return hashed;
}

/*
Compares a string and a hash, and checks if they're the same unhashed value.

@param password — unhashed string
@param pwdHash — hashed string

@return promise of boolean, telling us whether the strings are matching or not.
*/
export const compareHash = async (password: string, pwdHash: string): Promise<boolean> => {
    const result = await compare(password, pwdHash);
    return result;
}

/*
Generates a new signed JWT token

@param payload — a JWT payload with data we want to sign

@return a promise of string JWT token
*/
export const createToken = async (payload: JWTPayload): Promise<string> => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(SECRET)
}

/*
Verifies a JWT token

@param token — JWT token to verify

@return null or promise of JWT payload with decoded token data
*/
export const verifyToken = async (token: string): Promise<JWTPayload | null> => {
    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload;
    } catch(error) {
        return null
    }
}

/* 
Retrieves and decodes token from cookies

@return null or decoded JWT token
*/
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
