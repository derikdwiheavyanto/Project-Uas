module.exports = (route) =>{
   
    const jadwal = require("../../controller/jadwal.controller")

    //routes for jadwal
    route.post("/jadwal/", jadwal.create)  //create  jadwal
    route.get("/jadwal/", jadwal.findAll)   //get all jadwal
    route.get("/jadwal/:id", jadwal.findOne)  //get jadwal by id
    route.put("/jadwal/:id", jadwal.update)  //update jadwal
    route.delete("jadwal/:id", jadwal.delete)  //delete jadwal 
    route.put("/jadwal/change_status/:id", jadwal.changeStatus)  //update jadwal

}