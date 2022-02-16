import mongoose from "mongoose";

/**
 * An interface that describes the properties
 * that are required to create a new User
 */
interface UserAttrs {
  email: string;
  password: string;
}

/**
 * An interface that describes the properties
 * that a User Model has
 */
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

/**
 * An interface that describes the properties
 * that a User Document has
 */
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// this is how we declare custom function built into a model we adding statics property to our schema
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

/* Use as separate function but we have to export both User and buildUser
const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User, buildUser };
*/


export { User };
