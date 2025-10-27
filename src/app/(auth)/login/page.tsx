import GoogleSignInButton from "@/components/ui/GoogleSignInButton";

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={`flex flex-col gap-6 ${className ?? ""}`} {...props}>
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow p-6">
        <header className="mb-4">
          <h2 className="text-2xl font-semibold">Login to your account</h2>
        </header>

        <form className="flex flex-col gap-4">
          <GoogleSignInButton/>
        </form>
      </div>
    </div>
  )
}
