/**
 * Ini adalah file index yang berfungsi sebagai entry point 
 * dari semua routes yang ada di dalam folder v1
 */
module.exports = app => {
    const route = require("express").Router()

    require("./jadwal.routes")(route)

    app.use("/api/v1",route)
}