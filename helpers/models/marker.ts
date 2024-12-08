import mongoose from 'mongoose'

const markerSchema = new mongoose.Schema({
    position: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    name: {type: String, required: true},
    description: { type: String, required: true },
});
const Marker = mongoose.models.Marker || mongoose.model('Marker', markerSchema);
export default Marker