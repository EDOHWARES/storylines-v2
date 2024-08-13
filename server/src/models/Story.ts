import mongoose, { Document, Schema } from 'mongoose';

export interface IStory extends Document {
  customId?: string;
  title: string;
  type: 'root' | 'child';
  content: string;
  themeRoomId: mongoose.Types.ObjectId;
  prev: mongoose.Types.ObjectId[];
  next: mongoose.Types.ObjectId[];
}

const StorySchema: Schema = new Schema(
  {
    customId: { type: String, unique: true, sparse: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['root', 'child'], required: true },
    content: { type: String, required: true },
    themeRoomId: { type: mongoose.Types.ObjectId, ref: 'ThemeRoom', required: true },
    prev: [{ type: mongoose.Types.ObjectId, ref: 'Story' }],
    next: [{ type: mongoose.Types.ObjectId, ref: 'Story' }]
  },
  { timestamps: true }
);

const Story = mongoose.model<IStory>('Story', StorySchema);

export default Story;