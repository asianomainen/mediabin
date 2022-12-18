import logo from '../static/images/MediaBIN.svg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header
      className="flex py-5 items-center justify-center font-semibold text-2xl bg-[#202020] border-b-2 border-[#2b2b2b]">
      <div className="flex px-10">
        <div>
          <Link to="/"><img src={logo} alt={'Mediabin logo'} /></Link>
        </div>
        <div className="px-10 pt-3">
          Welcome to Mediabin
        </div>
      </div>
    </header>
  )
}

export default Header
