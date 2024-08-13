
import sequelize from "../config/connection";
import User from "./User";
import Password from "./password";



const db = {
  User,
  Password,
  sequelize,
};


export default db;
