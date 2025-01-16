const dbConfig = require("../config/database")
const mongoose = require("mongoose")


//koneksi ke database
module.exports = {
    mongoose,
    url: dbConfig.url,
    jadwal : require("./jadwal/jadwal.model")(mongoose)
}