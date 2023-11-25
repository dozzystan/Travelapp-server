import User from "../models/user.js";
import createHttpError from "http-errors";
import genertateToken from "../Utils/generateToken.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw createHttpError(400, "Parameters missing");
    }
    const existingUsername = await User.findOne({ username: username }).exec();
    if (existingUsername) {
      throw createHttpError(
        409,
        "username already taken, pls choose a new one"
      );
    }
    const existingEmail = await User.findOne({ email: email }).exec();
    if (existingEmail) {
      throw createHttpError(409, "Email already taken, pls choose a new one");
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);
    const user = await User.create({
      username: username,
      email: email,
      password: passwordHashed,
    });
    const access_token = genertateToken(user._Id);
    res.status(201).json({ access_token, user, msg: "User signup success" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameters missing");
    }

    const user = await User.findOne({ username: username })
      .select("+password +email")
      .exec();
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid password");
    }
    const access_token = genertateToken(user.id);
    res.status(200).json({ access_token, user, msg: "login sucess" });
  } catch (error) {
    next(error);
  }
};

export const getAuthUser = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select("+email").exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
