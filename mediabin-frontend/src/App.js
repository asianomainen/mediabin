import { createContext, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import mediaService from './services/media'
import SingleMedia from './components/SingleMedia'
import Menu from './components/Menu'
import Header from './components/Header'
import Footer from './components/Footer'
import styles from './static/index.css'

export const MediaContext = createContext({})

const App = () => {
  const [allMedia, setAllMedia] = useState([])
  const location = useLocation()

  useEffect(() => {
    const fetchMedia = async () => {
      const fetchedMedia = await mediaService.getAll()
      setAllMedia(fetchedMedia)
    }

    fetchMedia().catch(console.error)
  }, [location])

  return (
    <div style={styles} className="bg-[#252525] text-[#ddd] flex flex-col h-screen">
      <MediaContext.Provider value={[allMedia, setAllMedia]}>
        <Header />
        <div className="flex-1 py-2 container overflow-auto max-w-7xl">
          <Routes>
            <Route>
              <Route path="/" element={<Menu />} />
              <Route path="/:id" element={<SingleMedia />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </MediaContext.Provider>
    </div>
  )
}

export default App
