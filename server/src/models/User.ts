import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
    name: string;
    userName: string;
    email: string;
    favoriteThemeRooms: mongoose.Types.ObjectId[];
    favoriteStories: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    favoriteThemeRooms: [{ type: mongoose.Types.ObjectId, ref: "ThemeRoom" }],
    favoriteStories: [{ type: mongoose.Types.ObjectId, ref: "Story" }],

},
    {
        timestamps: true
    }
)

export default mongoose.model<IUser>('User', UserSchema)