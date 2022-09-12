import mongoose from 'mongoose'

mongoose.connect(process.env.DB_CLIENT)
const con = mongoose.connection
con.on('err',err => console.log(err))

const schemaUser = mongoose.Schema({
    'nama' : String,
    'email' : String,
    'password' : String,
    'createdAt' : {
        type : Date,
        default : Date.now
    }
})
  
mongoose.modelNames().forEach(schemaName => {
    mongoose.deleteModel(schemaName)
})

export const Users =  mongoose.model('users',schemaUser)