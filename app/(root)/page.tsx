import HeaderBox from "@/components/Home/HeaderBox"
import TotalBalance from "@/components/Home/totalBalance"
import Rightsidebar from "@/components/Home/rightsidebar/page"
import { getLoggedInUser } from "@/lib/action/user.server"

const Home = async () => {
  const loggedin = await getLoggedInUser()
  return (
    <section className="home">
      <div className="home-content">
          <header className="home-header">
            <HeaderBox 
            type='greeting'
            title= 'Welcome'
            user={loggedin?.name || 'Guest'}
            subtext="Access and manage your account and transaction efficiently "
            />

            <TotalBalance 
                account= {[]}
                totalBank = {1}
                totalAmount = {2698}
            />

        {/* Recent message  */}
          </header>
        </div>

        <div>
             <Rightsidebar 
              user={loggedin}
              transaction={[]}
              banks= {[{currentBalance: 123}, {currentBalance: 5000}]}
             /> 
        </div>
    </section>
  )
}

export default Home
