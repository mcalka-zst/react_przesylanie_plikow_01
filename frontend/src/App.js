import { useState } from "react";
import "./App.css";

const App = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    // tablica e.target.files jest dostępna w zdarzeniu zmiany (change event) dla elementu <input type="file">
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    //Wysyłanie pliku
    if(!file){
      console.log('Brak wybranego pliku');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try{
      const response = await fetch("http://localhost:3001/upload", {
        method:'POST',
        body:formData
      });
      if(!response.ok){
        throw new Error("Błąd podczas przesyłania pliku");
      }
      const data = await response.json();
      console.log(data)
    }
    catch (err){
      console.error('Błąd: ', err)
    }
    

  };

  return (
    <main>
      <h1>Wyślij jakiś obrazek</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <br />
        <br />
        <button type="submit">Wyślij obraz</button>
      </form>
    </main>
  );
};

export default App;
