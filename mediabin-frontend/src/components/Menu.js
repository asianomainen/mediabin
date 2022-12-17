import styles from '../index.css'
import MediaType from './MediaType'
import MediaList from './MediaList'

const Menu = ({ allMedia, setAllMedia }) => {
  return (
    <div style={styles} className='h-screen bg-[#252525] text-[#ddd]'>
      <div style={styles} className='container bg-[#252525] max-w-7xl'>
        <h1 className="text-5xl">MEDIABIN</h1>

        <h4>Welcome to Mediabin! Are you tired of only being able to paste text in Pastebin? Worry no more! Mediabin is
          here. With Mediabin you are able to share files in addition to text.</h4>

        <div>
          <MediaType allMedia={allMedia} setAllMedia={setAllMedia} />
          <h5>Uploaded media</h5>
          <MediaList allMedia={allMedia} />

        </div>
      </div>
    </div>
  )
}

export default Menu

