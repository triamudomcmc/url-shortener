import {useAuth} from "../../handlers/auth";

const Page = () => {
  const {SigninWithTUCMC, userData, signout} = useAuth()

  return (
    <div>
      <h1>Sign-in to edit your page</h1>
      <SigninWithTUCMC/>
    </div>
  )
}

export default Page