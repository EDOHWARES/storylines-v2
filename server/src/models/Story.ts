import mongoose, {Schema, Document, mongo} from "mongoose";

export interface IStory extends Document{
    title: string;
    type: string;
    content: string;
    author: mongoose.Types.ObjectId[];
    themeRoomId: mongoose.Types.ObjectId;
    prev : mongoose.Types.ObjectId[];
    next : mongoose.Types.ObjectId[];
}

const StorySchema: Schema = new Schema({
    title: {type:String, required: true},
    type: {type:String, required: true},
    author: [{type: mongoose.Types.ObjectId, required: true}],
    content: {type:String, required:true},
    themeRoomId: {type: mongoose.Types.ObjectId, required: true},
    prev: [{type: mongoose.Types.ObjectId, required: true}],
    next: [{type: mongoose.Types.ObjectId, required: true}],
})

export default mongoose.model<IStory>('Story', StorySchema);