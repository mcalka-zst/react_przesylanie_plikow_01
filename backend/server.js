const express = require('express');
const cors = require("cors");
const multer = require('multer'); //biblioteka multer ułatwia przetwarzanie plików przesyłanych przez formularze HTTP
//https://www.npmjs.com/package/multer
const app = express();
const port = 3001;

app.use(cors());

//konfiguracja multera, aby zapisywał przesłane pliki w folderze uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        //folder, w którym mają być zapisywane przesłane pliki
        //cb - callback
        cb(null, 'uploads/')
    },
    filename: function(req, file,cb){
        //nazwa pliku, która ma być użyta
        cb(null, Date.now()+"-"+file.originalname)
    }
})
//filtrowanie, aby były tylko plik jpg i png
const fileFiter = (req, file, cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Nieprawidłowy typ pliku. Dozwolone są tylko pliki JPG i PNG.'), false);
  }
}
//tworzenie instancji multera
const upload = multer({storage:storage});

//------------------------------------------------
app.post('/upload', upload.single('file'), (req, res)=>{
    // req.file zawiera informacje o przesłanym pliku
    console.log("Przesłano "+req.file.filename);
    res.json({ message: 'Plik został przesłany pomyślnie!', file: req.file });
})

//-------------------------------------------------
app.listen(port, ()=>{
    console.log(`Serwer działa na http://localhost:${port}`);
})