import { Schema, model } from "mongoose";

export const timeslotSchema = Schema({
    timestamp: {
        type: Date,
        required: true,
    },
    bookerId: { type: Schema.Types.ObjectId, ref: "User" },
    description: String,
});

const Timeslot = model("Timeslot", timeslotSchema);

export default Timeslot;
