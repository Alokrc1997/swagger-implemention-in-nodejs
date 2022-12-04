const mongoose = require('mongoose');
const db_link = 'DB_Url';
mongoose.connect(db_link)
    .then((db) => {
        console.log("db connected");
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = mongoose;