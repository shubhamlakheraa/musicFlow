import { useEffect, useState } from 'react'
import ListSongs from './components/ListSongs'
import MusicPlayer from './components/MusicPlayer'
import useResponsive from './hooks/useResponsive'
import TDrawer from './components/Drawer'

function App() {

  const first = {
    accent: "#331E00",
    artist: "William King",
    cover: "4f718272-6b0e-42ee-92d0-805b783cb471",
    date_created: "2023-08-10T06:10:57.746Z",
    date_updated: "2023-08-10T07:19:48.547Z",
    id: 1,
    name: "Colors",
    sort: null,
    status: "published",
    top_track: true,
    url: "https://pub-172b4845a7e24a16956308706aaf24c2.r2.dev/august-145937.mp3",
    user_created: "2085be13-8079-40a6-8a39-c3b9180f9a0a",
    user_updated: "2085be13-8079-40a6-8a39-c3b9180f9a0a"
  };

  const [err, setErr] = useState("")
  const [musicData, setMusicData] = useState()
  const [singleSong, setSingleSong] = useState(first)

  const backgroundThemes = {
    theme1: 'linear-gradient(108.18deg, #201606 2.46%, #000000 99.84%)',
    theme2: 'linear-gradient(108.18deg, rgba(51, 66, 94, 0.6) 2.46%, rgba(0, 0, 0, 0.6) 99.84%)',
    theme3: 'linear-gradient(to right top, #e3caa5, #dfc4a1, #dcbe9e, #d8b99a, #d4b397, #cfae93, #cba88f, #c6a38b, #c09d85, #b9977f, #b39179, #ad8b73)',
  };

  const { isMobile, isTablet, isDesktop } = useResponsive()

  const getData = async () => {
    try {
      const response = await fetch("https://cms.samespace.com/items/songs")
      if(!response.ok){
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setMusicData(data)
      
    } catch (error) {
      setErr("Error fetching data")

      
    }

  }
  
  useEffect(() => {
    getData()
    

 }, [])

 useEffect(() => {

  if(singleSong){

    const selectedTheme = singleSong.id % 2  ? 'theme1' : 'theme2'

    document.body.style.background = backgroundThemes[selectedTheme]
  }

 }, [singleSong])
  

 console.log(isMobile, isTablet, isDesktop);
  

  return (
    <>
     <div className='inline-block relative top-8 ml-5'>
      <img src="/spotify.png" className='inline'/>
      
     
    
    </div>

    <div className={` ${!isDesktop ? "" : "flex justify-between"} `}>
      {isDesktop ? <ListSongs musicData={musicData} setMusicData={setMusicData} setSingleSong={setSingleSong} /> : <TDrawer musicData={musicData} setSingleSong={setSingleSong} /> }
    
    <MusicPlayer musicData={musicData} singleSong={singleSong} setSingleSong={setSingleSong}  />
    </div>





    {!isDesktop ? "" : <img src='/avatar.png' className='inline relative left-5'/>}
    
    </>
  )
}

export default App



