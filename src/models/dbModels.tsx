import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  hours: {
    type: Number
  }
});

export default mongoose.models.dbModels || mongoose.model("dbModels", Schema);
