import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Ongoing', 'Pending', 'Collaborative Task', 'Done'],
    default: 'Ongoing'
  },
  category: {
    type: String,
    enum: ['Nature', 'Family', 'Sport', 'Friends', 'Meditation', 'Other'],
    default: 'Other'
  },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
