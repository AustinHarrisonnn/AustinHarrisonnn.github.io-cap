import { useState } from 'react';
import viteLogo from '/vite.svg';
import './App.css';
import APIForm from './components/APIForm';
import Gallery from './components/Gallery';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [prevImages, setPrevImages] = useState([]); 

  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });

  const [currentImage, setCurrentImage] = useState(null);

  const submitForm = () => {
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1000",
    };

    if (inputs.url.trim() === "") {
      alert("You forgot to submit a URL!");
      return;
    }

    const updatedInputs = { ...inputs };
    for (const [key, value] of Object.entries(updatedInputs)) {
      if (value.trim() === "") {
        updatedInputs[key] = defaultValues[key];
      }
    }

    setInputs(updatedInputs);
    makeQuery(updatedInputs);
  };

  const makeQuery = (updatedInputs) => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + updatedInputs.url;

    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${updatedInputs.format}&width=${updatedInputs.width}&height=${updatedInputs.height}&no_cookie_banners=${updatedInputs.no_cookie_banners}&no_ads=${updatedInputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    
    callAPI(query).catch(console.error);
  };

  const callAPI = async (query) => {
    try {
      const response = await fetch(query);
      const json = await response.json();
      if (json.url === null) { 
        alert("Oops! Something went wrong with that query, let's try again!");
      } else {
        setCurrentImage(json.url);
        setPrevImages((prevState) => [...prevState, json.url]); 
        reset();
      }
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  };

  return (
    <div className="whole-page">
      <h1>Build Your Own Screenshot! 📸</h1>
      <APIForm
        inputs={inputs}
        handleChange={(e) => 
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />
      <br />

      {currentImage ? (
        <img
          className="screenshot"
          src={currentImage}
          alt="Screenshot returned"
        />
      ) : (
        <div> </div>
      )}

      <div className="container">
        <h3> Current Query Status: </h3>
        <p>
          https://api.apiflash.com/v1/urltoimage?access_key={ACCESS_KEY}  
          <br />
          &url={inputs.url} <br />
          &format={inputs.format} <br />
          &width={inputs.width}
          <br />
          &height={inputs.height}
          <br />
          &no_cookie_banners={inputs.no_cookie_banners}
          <br />
          &no_ads={inputs.no_ads}
          <br />
        </p>
      </div>

      <br />
      <Gallery images={prevImages} />
    </div>
  );
}

export default App;