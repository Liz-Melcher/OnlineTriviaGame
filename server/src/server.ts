import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { sequelize } from "./models/index.js";
import authenticateToken from "./middleware/authenticate-token.js";

import gameRoutes from "./routes/game.js";
import userRoutes from "./routes/user.js";
import customQuestionsRoute from "./routes/customquestions.js";

import { User } from "./models/user.js";
import { Settings } from "./models/settings.js";
import { GameState } from "./models/gamestate.js";
import { validateUsername, validatePassword } from "./assets/utils.js";

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS Setup


// app.use(cors());

// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
// };
// app.use(cors(corsOptions));            // Handle regular requests
// app.options("*", cors(corsOptions));   // Handle preflight requests (OPTIONS)

// ✅ Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Routes
app.use("/game", authenticateToken, gameRoutes);
app.use("/user", authenticateToken, userRoutes);
app.use("/customquestions", authenticateToken, customQuestionsRoute);

// ✅ Login Route
app.post("/login", async (req: Request, res: Response): Promise<void> => {
    console.log("🔐 Hit the login route");
    try {
      const { username, password } = req.body;
      console.log("LOGIN ATTEMPT:", username);
  
      const user = await User.findOne({ where: { username } });
      if (!user) {
        console.log("User not found.");
        res.status(400).json({ message: "Invalid username or password" });
        return;
      }
  
      console.log("User found:", user.username);
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      console.log("Password match?", isPasswordValid);
  
      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid username or password" });
        return;
      }
  
      const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY!, { expiresIn: "30m" });
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

// ✅ Register Route
app.post("/register", async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
  
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        res.status(400).json({ message: "Username already exists" });
        return;
      }
  
      if (!validateUsername(username)) {
        res.status(400).json({
          message: "Invalid username. Must be between 6 and 30 characters and only contain alphanumeric characters",
        });
        return;
      }
  
      if (!validatePassword(password)) {
        res.status(400).json({
          message:
            "Invalid password. Must be between 6 and 30 characters and only contain alphanumeric characters and !@#$%^&*()-_=+[]{}|;:,.?<>",
        });
        return;
      }
  
      const newUser = await User.create({ username, password });
      await Settings.create({ userId: newUser.id });
      await GameState.create({ userId: newUser.id });
  
      res.status(200).send("User registration successful");
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

// ✅ Start Server After Models Are Synced
sequelize.sync({ force: false, logging: false }).then(() => {
  console.log("All models synced successfully");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
