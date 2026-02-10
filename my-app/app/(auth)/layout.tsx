export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <p>Auth</p>
            {children}
        </div>
    )
}