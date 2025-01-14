import { LogOutAcc } from "@/lib/action/user.server"
import assets from "@/public/asset"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Footer = ({user, type='desktop'}:FooterProps) => {
    const router = useRouter()
    const handleLogOut = async () => {
     const loggedOut = await LogOutAcc();
    if(loggedOut){
      router.push('/sign-in')
    } 
    }
  return (
    <footer className='footer'>
        <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
              <p className=' text-xl font-bold text-gray-700 '>
                {user.name[0]}      
              </p>
        </div>

        <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
            <h1 className="text-14 truncate   text-gray-700 font-semibold">
                {user.name}
            </h1>

            <p className="text-14 truncate font-normal  text-gray-600">
            {user.email}
            </p>
        </div>

        <div className="footer_image text-red-400" onClick={() => handleLogOut()}>
            <Image src={assets.Logout} alt='Logout'/>
        </div>
    </footer>
  )
}

export default Footer
