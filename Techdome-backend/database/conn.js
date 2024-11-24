

// const mongoose = require("mongoose");

// mongoose.connect(process.env.DB)
//     .then(() => {
//         console.log("Connection established...");
//     })
//     .catch((error) => {
//         console.error("Error connecting to MongoDB:", error);
//     });




const mongoose = require("mongoose");

mongoose.connect(process.env.DB).then(() => {
    console.log("connection established...!");
}).catch((error) => {
    console.log(error);
})