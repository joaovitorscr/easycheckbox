import { Button } from './ui/button'

export default function GoogleSignInButton() {
  function loginWithGoogle() {
    return console.log('Google login')
  }
  return (
    <Button onClick={loginWithGoogle} className="w-full">
      Google Logo
    </Button>
  )
}
