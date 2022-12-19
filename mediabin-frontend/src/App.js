import { createContext, useEffect, useState } from 'react'
import { Route, Routes, useLocation, useMatch } from 'react-router-dom'

import mediaService from './services/media'
import Media from './components/Media'
import Menu from './components/Menu'
import Header from './components/Header'
import Footer from './components/Footer'
import styles from './index.css'

export const MediaContext = createContext({})

const App = () => {
  const [allMedia, setAllMedia] = useState([])
  const location = useLocation()

  const match = useMatch('/:id')
  const media = match
    ? allMedia.find(media => media.id === match.params.id)
    : null

  useEffect(() => {
    const fetchMedia = async () => {
      const fetchedMedia = await mediaService.getAll()
      setAllMedia(fetchedMedia)
    }

    fetchMedia().catch(console.error)
  }, [location])

  return (
    <div style={styles} className="bg-[#252525] text-[#ddd] flex flex-col h-screen">
      <MediaContext.Provider value={[allMedia, setAllMedia, media]}>
        <Header />
        <div className="flex-1 py-2 container overflow-auto max-w-7xl">
          <Routes>
            <Route>
              <Route path="/" element={<Menu />} />
              <Route path="/:id" element={<Media />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </MediaContext.Provider>
    </div>
  )
}

export default App
