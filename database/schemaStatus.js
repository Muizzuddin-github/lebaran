import mongoose from 'mongoose'

mongoose.connect(process.env.DB_CLIENT)
const con = mongoose.connection
con.on('err',err => console.log(err))

const schemaKunjungan = mongoose.Schema({
    'nama' : String,
    'alamat' : String,
    'noHP' : String,
    'tanggal' : String
})


const schemaStatus = mongoose.Schema({
    'status' : String,
    'id_user' : String,
    'kunjungan' : [schemaKunjungan]
})

mongoose.modelNames().forEach(schemaName => {
    mongoose.deleteModel(schemaName)
})


export const Status =  mongoose.model('status',schemaStatus,'status')