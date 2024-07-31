import mongoose, { Document, Schema } from 'mongoose';

export interface IStory extends Document {
  title: string;
  type: string;
  content: string;
  author: mongoose.Types.ObjectId[];
  themeRoomId: mongoose.Types.ObjectId;
  prev: mongoose.Types.ObjectId[];
  next: mongoose.Types.ObjectId[];
  customId?: string;
}

const StorySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
    author: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true }],
    themeRoomId: { type: mongoose.Types.ObjectId, ref: 'ThemeRoom', required: true },
    prev: [{ type: mongoose.Types.ObjectId, ref: 'Story' }],
    next: [{ type: mongoose.Types.ObjectId, ref: 'Story' }],
    customId: { type: String, unique: true, sparse: true }
  },
  { timestamps: true }
);

const Story = mongoose.model<IStory>('Story', StorySchema);

export default Story;
