interface ServerOrigin {
    origin: "server" | "browser",
    url: string
}

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