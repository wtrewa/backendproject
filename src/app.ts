import express, { Request, Response, urlencoded } from "express";
import session from "express-session";
import SequelizeStoreInit from "connect-session-sequelize";
import passport from "passport";
import cors from "cors";
import "dotenv/config";
import authRoute from "./routes/authRoutes";
import googleAuthRoute from "./routes/googleAuthRoutes";
import emailRoute from "./routes/verifyEmail";
import db from "./models/index";
import passwordRoute from "./routes/passwordRoutes";
import Password from "./models/password";
import User from "./models/User";


const SequelizeStore = SequelizeStoreInit(session.Store);


const app = express();
const PORT = 8080

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());






app.use("/auth", googleAuthRoute);
app.use("/api", authRoute);
app.use("/api", emailRoute);
app.use('/api',passwordRoute)


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the home page");
});


console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {


    db.User.associate({ Password });
    db.Password.belongsTo(User, { foreignKey: "userId" }); 
    await db.sequelize.authenticate();
    // await db.sequelize.sync({alter:true})
    console.log("Database connected!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});