import mongoose from "mongoose";

export function dataBaseConnection(){

    const mongooseParams = {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        serverSelectionTimeoutMS: 5000,
    }

    mongoose.connect(process.env.DB_URL ,mongooseParams)
    .then(()=> console.log("Database connected"))
    .catch((err)=>console.error(err));
    
}