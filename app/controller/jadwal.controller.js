const db = require("../models");
const Jadwal = db.jadwal;


// Create Jadwal
exports.create = (req, res) => {
    req.body.start_date = new Date(req.body.start_date);
    req.body.end_date = new Date(req.body.end_date);

    Jadwal.create(req.body)
        .then(data => {
            res.send({
                message: "Jadwal was created successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error create jadwal" });
        });
}

// findAll jadwal
exports.findAll = (req, res) => {
    Jadwal.find()
        .then(data => {
            res.send({
                message: "findAll jadwal",
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error findAll jadwal" });
        });
}

// Find jadwal by id
exports.findOne = (req, res) => {
    Jadwal.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: "Jadwal not found with id " + req.params.id });
            }
            res.send({
                message: "Success get jadwal",
                datas: data
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: "Jadwal not found with id " + req.params.id });
            }
            return res.status(500).send({ message: "Error retrieving Jadwal with id " + req.params.id });
        })
}

// Update jadwal by id
exports.update = (req, res) => {
    Jadwal.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            return res.status(404).send({ message: "Jadwal not found with id " + req.params.id });
        }
        res.send({
            message: "update jadwal",
            data: data
        });
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({ message: "Jadwal not found with id " + req.params.id });
        }
        return res.status(500).send({ message: "Error updating Jadwal with id " + req.params.id });
    })
}

// Delete jaadwal by id
exports.delete = (req, res) => {
    Jadwal.findByIdAndDelete(req.params.id).then(data => {
        if (!data) {
            return res.status(404).send({ message: "Jadwal not found with id " + req.params.id });
        }
        res.send({
            message: "delete jadwal",
            data: data
        });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({ message: "Jadwal not found with id " + req.params.id });
        }
        return res.status(500).send({ message: "Could not delete Jadwal with id " + req.params.id });
    })
}


// mengubah status jadwal
exports.changeStatus = async (req, res) => {

    let statusJadwal = await Jadwal.findById(req.params.id);

    if (!statusJadwal) {
        return res.status(404).send({ message: "Jadwal tidak ditemukan " });
    }

    if (statusJadwal.status === 'selesai') {
        statusJadwal.status = 'belum selesai';
    } else {
        statusJadwal.status = 'selesai';
    }

    Jadwal.findByIdAndUpdate(req.params.id, { status: statusJadwal.status }, { useFindAndModify: false }).then(data => {
        if (!data) {
            return res.status(404).send({ message: "Jadwal tidak ditemukan " + req.params.id });
        }
        res.send({
            message: "update status jadwal",
            data: data
        });
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({ message: "Jadwal tidak ditemukan " + req.params.id });
        }
        return res.status(500).send({ message: "Error Update Jadwal "});
    })
}