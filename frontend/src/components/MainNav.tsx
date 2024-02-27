import { Button } from "./ui/button";

const MainNav = () => {
  return (
    // ghost removes most of the styles so can add a few of our own
    <Button 
        variant="ghost" 
        className="font-bold hover:text-orange-500 hover:bg-white"
    >
        Log In
    </Button>
  )
}
export default MainNav;