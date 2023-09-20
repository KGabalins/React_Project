import { useState, useEffect } from "react";
import "./styles/Nasa.css";
import { NasaData, NasaItem } from "./items/NasaItem";

const API_KEY = `1NfgHN3IybfUE0SM1NbaGjNYFgvuyn8LfbGYoYBD`;

const query = `date=2022-01-01&`;

export const NASA = () => {
  const [nasaData, setNasaData] = useState<NasaData | null>();
  const [url, setUrl] = useState(
    `https://api.nasa.gov/planetary/apod?${query}api_key=1NfgHN3IybfUE0SM1NbaGjNYFgvuyn8LfbGYoYBD`
  );
  const [date, setDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setNasaData(null)
    setErrorMsg("")

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
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`
    );
  }, [date]);

  return (
    <div className="page">
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      {nasaData ? <NasaItem nasaData={nasaData}/> : errorMsg ? <p>{errorMsg}</p> : <p>...Loading</p>}
    </div>
  );
};
