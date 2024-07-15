const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");

//middleware

app.use(cors());
app.use(express.json());

//Routes

//register and login routes
// app.use("/auth", require("./routes/Auth"));

app.use("/covid", require("./routes/covid"))

// //Route to destination
// app.use("/ticketing", require("./routes/destination"))

// //Route to airline
// app.use("/ticketing", require("./routes/airline"))

// //Route to booking
// app.use("/ticketing", require("./routes/booking"))

app.listen(5000, () => {
    console.log("Listening on port 5000")
})