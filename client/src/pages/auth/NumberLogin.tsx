import { LoginForm } from "@/components/login-form"
const NumberLogin = () => {
  return (
  
        <div className="flex h-screen flex-col items-center justify-center bg-muted p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-4xl">
            <LoginForm />
          </div>
        </div>
      )
  
}

export default NumberLogin