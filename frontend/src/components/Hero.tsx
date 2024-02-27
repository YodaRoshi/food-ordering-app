import hero from "../assets/hero.png"

const Hero = () => {
    // a self closing tag <img/>
  return (
    <div>
        <img src={hero} className="w-full max-h-[600px] object-cover"/>
    </div>
  )
}

export default Hero;