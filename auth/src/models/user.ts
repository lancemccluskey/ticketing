// Our mongo user model
import mongoose from 'mongoose';
import { Password } from '../services/password';

// * An interface that describes the properties
// * that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// * An interface that describes the properties
// * that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// * An interface that describes the properties
// * that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String, // * Capitalized because constructor
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password; // delete keyword removes property from object
      delete ret.__v; // __v is the version key
    }
  }
});

// Call done when function completed
// cant use => because we wouldnt have access to this
userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password')); // gets password off doc
    this.set('password', hashed);
  }
  done();
});

// This is valid, but TS throws errors about using build
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// Creates the actual model
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
