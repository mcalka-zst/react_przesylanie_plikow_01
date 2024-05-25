import { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    // tablica e.target.files jest dostępna w zdarzeniu zmiany (change event) dla elementu <input type="file">
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Wysyłanie pliku
    if (!file) {
      setMessage("Wybierz plik!!!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Błąd podczas przesyłania pliku");
      }
      const res = await response.json();
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Resetuje pole pliku
      }
      setMessage(res.message);
     
    } catch (err) {
      setMessage("Błąd: ", err);
    }
  };

  return (
    <main>
      <h1>Wyślij mi jakiś plik</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} ref={fileInputRef} />
        <br />
        <br />
        <button type="submit">Wyślij obraz</button>
      </form>
      <p>{message}</p>
    </main>
  );
};

export default App;
