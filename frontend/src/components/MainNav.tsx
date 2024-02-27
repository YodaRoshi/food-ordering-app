import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";

const MainNav = () => {
    const {loginWithRedirect} = useAuth0();
  return (
    // ghost removes most of the styles so can add a few of our own
    <Button 
        variant="ghost" 
        className="font-bold hover:text-orange-500 hover:bg-white"
        onClick={async () => await loginWithRedirect()}
    >
        Log In
    </Button>
  )
}
export default MainNav;