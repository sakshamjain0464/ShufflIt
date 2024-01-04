import { useState } from 'react'
import './App.css'
import Card from '../components/Card/Card.jsx'
import Loading from '../components/Loading/Loading.jsx'

function App() {
  let key = import.meta.env.VITE_REACT_APP_API_KEY;
  let [data, setData] = useState({});
  let [search, setSearch] = useState('');
  let [attributes, setAttributes] = useState({
    found : false,
    pages : 0,
    query : '' ,
    searched : false, 
    total: 0, 
    currentPage : 1
  });
  let [pageSize, setPageSize] = useState(10);
  

  let searchImages = async (event, pageNo) => {
    if(search){
      setAttributes({query: search.trim(), searched : true, found : false, pages : 0, currentPage : 0, total : 0});
      setData({});
      try{
        let json = await fetch(`https://api.unsplash.com/search/photos?page=${pageNo}&query=${search.trim()}&client_id=${key}&per_page=${pageSize}`);
        let parsedJSON = await json.json();
        setData(parsedJSON);
        if(parsedJSON.total){
          setAttributes({query: search.trim(), found : true, searched:true, pages : parsedJSON.total_pages, total: parsedJSON.total, currentPage: pageNo});
        }
        else{
          setAttributes({query: search.trim(), found : false, searched:true, pages : 0, currentPage : 0, total : 0});
        }
      }
      catch(error){
        setAttributes({found : false, searched: true});
        alert("API Limit Exceeded, Try after some time");
      }
    }
    else {
      alert("Please Enter Something into the Search Box!");
    } 
}

    let goNext = () =>{
      let next = attributes.currentPage + 1;
      if(next <= attributes.pages){
        searchImages('', next);
      }
      else{
        alert("Next Page Not Available");
      }
    }

    let goPrevious = async() =>{
      let prev = attributes.currentPage - 1;
      if(prev >= 1 ){
        searchImages('', prev);
      }
      else{
        alert("previous Page Not Available");
      }
    }


  return (
    <>
      <div className="head">
        <h1>ShufflIT</h1>
        <h2>Get Your Images</h2>
        <div className="search-container">
          <input type="text" name="" id=""  onInput={(event) => setSearch(event.target.value)} placeholder='Enter Topic to search'/>
          <button onClick={() => searchImages('', 1)}><i className="fa-solid fa-magnifying-glass"></i> Search</button>
        </div>
        <div className='page-size-container'>
          <label htmlFor="page-size">Page Size : </label>
          <input type="range" name="" id="page-size" value={pageSize} min={5} max={30} onChange={(event) => setPageSize(event.target.value)}/>
          <p>{pageSize}</p>
        </div>
        <div className="images-container">
          {!attributes.searched && <h2>Search Something to get images!!</h2>}
          {attributes.query && <h1>Images for &quot;{attributes.query}&quot;</h1>}
          {attributes.searched && !attributes.found && <Loading/>}
          {attributes.query && <p>{attributes.total} Images found for &quot;{attributes.query}&quot;</p>}
          {attributes.found && 
              <div className="images">
                {data.results.map((image) => <Card key={image.id} url={image.urls.regular} imgUrl={image.links.download}/>)}
              </div>}
            { attributes.found && attributes.total != [] && <div className="page-buttons">
              <button className="previous" onClick={goPrevious}><i className="fa-solid fa-chevron-left"></i> Previous</button>
              <p>{attributes.currentPage} of {attributes.pages}</p>
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
