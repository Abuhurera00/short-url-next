import mongoose from "mongoose";

const dbConnect = async () => {

    try {
        mongoose.connection.on('connected', () => {
            console.log('DB Connected');
        })

        await mongoose.connect(`${process.env.MONGODB_URI}/url-shortener`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}

export default dbConnect;