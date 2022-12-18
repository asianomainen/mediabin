import logo from '../static/images/MediaBIN.svg'

const Header = () => {
  return (
    <div
      className="flex py-5 items-center justify-center font-semibold text-2xl bg-[#202020] border-b-2 border-[#2b2b2b]">
      <div className="flex px-10">
        <div>
          <img src={logo} alt={'Mediabin logo'} />
        </div>
        <div className="px-10 pt-3">
          Welcome to Mediabin
        </div>
      </div>
    </div>
  )
}

export default Header
