import { useState, useEffect } from "react";
import "../styles/Nasa.css";
import { NasaData, NasaItem } from "../items/NasaItem";

export const NASA = () => {
  const [nasaData, setNasaData] = useState<NasaData | null>();
  const [url, setUrl] = useState(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`
  );
  const [date, setDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setNasaData(null);
    setErrorMsg("");

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.code === 400) {
          setErrorMsg(response.msg);
        } else {
          setErrorMsg("");
          setNasaData(response);
        }
      });
  }, [url]);

  useEffect(() => {
    setUrl(
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.REACT_APP_NASA_API_KEY}`
    );
  }, [date]);

  return (
    <div className="page">
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      {nasaData ? (
        <NasaItem nasaData={nasaData} />
      ) : errorMsg ? (
        <p>{errorMsg}</p>
      ) : (
        <p>...Loading</p>
      )}
    </div>
  );
};
