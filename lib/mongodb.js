import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;

// import mongoose from "mongoose";

// const connectMongoDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI, {
//             useUnifiedTopology: true,
//             useNewUrlParser: true, // Remove this line
//         });
//         console.log("Connected to MongoDB.");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// };

// export default connectMongoDB;
