import Authform from "@/components/Auth-form/page"
import { getLoggedInUser } from "@/lib/action/user.server"

const SignUp = async () => {
  const loggedInUser = await getLoggedInUser()
  console.log(loggedInUser);
  
  return (
    <div>
       <section className='signIn'>
           <Authform type='sign-up'/>
       </section>
    </div>
  )
}

export default SignUp
