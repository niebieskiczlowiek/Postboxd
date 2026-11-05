interface ServerOrigin {
    origin: "server" | "browser",
    url: string
}

/*
Since we use fetch() to call our internal API, we need to pass the exact url of the app.
However, it might be different whether you're hosting it locally, on vercel or somewhere else.

Use getServerOrigin to get the exact root url of the app.
*/
export const getServerOrigin = (): ServerOrigin => {
    if (typeof window !== 'undefined') return {
        origin: "browser",
        url: ""
    };
    if (process.env.VERCEL_URL) return {
        origin: "server",
        url: `https://${process.env.VERCEL_URL}`
    };
    return {
        origin: "server",
        url: `http://localhost:${process.env.PORT || "3000"}`
    };
}