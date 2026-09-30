import AuthLayoutFooter from "@/components/auth-layout-footer";
import AuthLayoutHeader from "@/components/auth-layout-header";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <AuthLayoutHeader />
          {children}
        <AuthLayoutFooter />
      </div>
    </div>
  )
}