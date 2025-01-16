const express = require('express');
const cors = require('cors');
const db = require('./app/models');
const app = express();


//enable cors
const corsOptions = {
    origin: "*"
    };


//resgister middleware
app.use(cors(corsOptions));
app.use(express.json());


//connect to database
const configMonoose = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//connect to database
db.mongoose.connect(db.url)
.then(()=>{
    console.log("Database Connected");
}).catch(err =>{
    console.log("Gagal Konek", err);
    process.exit();
})


// initial routes V1
require('./app/routes/v1')(app);

//set port, listen for request
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})

