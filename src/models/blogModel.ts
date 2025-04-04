import mongoose from 'mongoose';

interface IComment {
    _id: any;
    user: string;
    text: string;
    createdAt: Date;
}

interface IBlog {
    title: string;
    content: string;
    category: string;
    author: string;
    image?: string;
    likes: number;
    comments: IComment[];
}

const CommentSchema = new mongoose.Schema<IComment>({
    user: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const BlogSchema = new mongoose.Schema<IBlog>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String },
    likes: { type: Number, default: 0 },
    comments: [CommentSchema] // Embedded comments array
}, { timestamps: true });

export default mongoose.model<IBlog>('Blog', BlogSchema);
