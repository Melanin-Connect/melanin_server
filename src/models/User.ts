import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

//Notification type
interface INotification {
  message: string;
  date: Date;
  read: boolean;
}

// User type
export interface IUser extends Document {
  email: string;
  password: string;
  role: "user" | "admin" ;  
  profilePicture?: string;
  notifications: INotification[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// a  schema for notifications
const NotificationSchema = new mongoose.Schema<INotification>(
  {
    message: { type: String, required: true},
    date: { type: Date, default: Date.now},
    read: { type: Boolean, default: false},
  },
  {_id: false}
)

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }  // Default role is "user"
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
