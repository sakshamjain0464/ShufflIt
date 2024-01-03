import { useState } from 'react'
import './App.css'
import Card from '../components/Card/Card.jsx'
import Loading from '../components/Loading/Loading.jsx'

function App() {
  let key = import.meta.env.VITE_REACT_APP_API_KEY
  let [data, setData] = useState({})
  let [search, setSearch] = useState('')
  let [page, setPage] = useState(Number(1))
  let [attributes, setAttributes] = useState({
    found : false,
    pages : 0,
    query : '' ,
    searched : true, 
    total: 0
  })
  

  let searchImages = async () => {
    if(search){
      let curr = attributes.query;
      (curr!=search)?setPage(1):false
      setAttributes({query: search.trim(), searched : false})
      try{
        let json = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${search.trim()}&client_id=${key}&per_page=30`)
        let parsedJSON = await json.json()
        setData(parsedJSON)
        console.log(parsedJSON)
        if(parsedJSON.results){
          setAttributes({query: search.trim(), found : true, searched:true, pages : parsedJSON.total_pages, total: parsedJSON.total})
        }
        else{
          setAttributes({query: search.trim(), found : false, searched:true, pages : -1})
        }
        console.log(page)
      }
      catch(error){
        setAttributes({found : false, searched: true})
        console.log(error)
      }
    }
    else {
      alert("Please Enter Something into the Search Box!")
    } 
}

    let goNext = () =>{
      let next = page + 1
      if(page <= attributes.pages){
        setPage(next)
      }
      searchImages()
      console.log(page)
    }

    let goPrevious = async() =>{
      let prev = page - 1
      if(page > 1){
        setPage(prev)
      }
      searchImages()
      console.log(page)
    }


  return (
    <>
      <div className="head">
        <h1>ShufflIT</h1>
        <h2>Get Your Images</h2>
        <div className="search-container">
          <input type="text" name="" id=""  onInput={(event) => setSearch(event.target.value)} placeholder='Enter Topic to search'/>
          <button onClick={searchImages}><i className="fa-solid fa-magnifying-glass"></i> Search</button>
        </div>
        <div className="images-container">
          {attributes.query && <h1>Images for &quot;{attributes.query}&quot;</h1>}
          {!attributes.searched && <Loading/>}
          {attributes.found && attributes.query && <p>{attributes.total} Images found for &quot;{attributes.query}&quot;</p>}
          {attributes.found && 
              <div className="images">
                {data.results.map((image) => <Card key={image.id} url={image.urls.regular} imgUrl={image.links.download}/>)}
              </div>}
            { attributes.found && attributes.total != [] && <div className="page-buttons">
              <button className="previous" onClick={goPrevious}><i className="fa-solid fa-chevron-left"></i> Previous</button>
              <button className="next" onClick={goNext}>Next <i className="fa-solid fa-chevron-right"></i></button>
            </div>}
        </div>
      </div>
      <div className="footer">
        <p>Created By - Saksham Jain</p>
        <a href="https://github.com/sakshamjain0464/ShufflIt" target='_blank' rel='noreferrer'><i className="fa-brands fa-github"></i></a>
        <a href="https://www.linkedin.com/in/saksham-jain-15bab2205/" target='_blank' rel='noreferrer'><i className="fa-brands fa-linkedin"></i></a>
      </div>
    </>
  )
}

export default App
