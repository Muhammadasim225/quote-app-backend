import { quotes, users } from "./fakedb.js";
import { randomBytes } from 'crypto';
import userModal from "./models/userSchema.js";
import quoteModal from "./models/quoteSchema.js";
import { hash, compare } from "bcryptjs";
import jwt from 'jsonwebtoken';

const { sign } = jwt;
const resolver = {
  Query: {
    users: async () => {
      return await userModal.find({});
    },
    quotes: async () => {
      return await quoteModal.find({}).populate("by", "_id firstname lastname");
    },
    user: async (_, args) => {
      return await userModal.findOne({ _id: args._id });
    },
    iquote: async (_, args) => {
      return await quoteModal.findOne({ by: args.by });
    },
    myProfile: async (_, args, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged In");
      }
      return await userModal.findOne({ _id: userId });
    },
  },

  User: {
    quotes: async (user) => {
      return await quoteModal.find({ by: user._id });
    }
  },

  Mutation: {
    signupUser: async (_, { userNnew }) => {
      const user = await userModal.findOne({ email: userNnew.email });
      if (user) {
        throw new Error("User already exists");
      }

      const hashedPassword = await hash(userNnew.password, 12);
      const newUser = new userModal({
        ...userNnew,
        password: hashedPassword
      });

      return await newUser.save();
    },

    loginUser: async (_, { userSignIn }) => {
      const user = await userModal.findOne({ email: userSignIn.email });

      if (!user) {
        throw new Error("User not registered");
      }

      const isMatch = await compare(userSignIn.password, user.password);
      if (!isMatch) {
        throw new Error("Password does not match");
      }

      const token = sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return { token };
    },

    createQuote: async (_, { name }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged In");
      }

      const newQuote = new quoteModal({
        name,
        by: userId
      });

      await newQuote.save();
      return "Quote saved successfully";
    }
  }
};

export default resolver;
