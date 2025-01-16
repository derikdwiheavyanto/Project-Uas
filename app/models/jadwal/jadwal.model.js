// skema database untuk jadwal
module.exports = mongoose => {
    const scema = mongoose.Schema(
        {
            title: String,
            description: String,
            start_date: String,
            end_date: String,
            status:{
                type: String,
                enum: ['belum selesai', 'selesai'],
                default: 'belum selesai'
            }
        },
        { timestamps: true }
    )

    scema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    return mongoose.model("jadwal", scema)
}

