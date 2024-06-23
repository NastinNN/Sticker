import { LoginForm } from "features/auth/ui"
import { AuthForm } from "features/auth/ui/auth"
import { SignInForm } from "features/auth/ui/formSignIn"
import { Container } from "features/page-wrapper/container"

export const AuthPage = () => {

  return (
    <Container>
      <AuthForm />
    </Container>
  )
}