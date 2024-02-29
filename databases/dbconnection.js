import mongoose from 'mongoose'

const dbconnection = () => {
    try {
        mongoose.connect("mongodb+srv://graduated:graduated12@cluster0.xnavg3n.mongodb.net/graduatedproject", { useNewUrlParser: true })
        // mongoose.connect("mongodb://127.0.0.1:27017/graduatedproject", { useNewUrlParser: true })

        console.log('database connected successfully')
    } catch (error) {
        console.log('not connected ')
    }
}


export default dbconnection