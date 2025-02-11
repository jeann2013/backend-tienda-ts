import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  event: { type: String, required: true },
  data: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model('Log', LogSchema);
export default Log;