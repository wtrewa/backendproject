import { Sequelize } from "sequelize";
import "dotenv/config";

const dbname:any = process.env.DB_NAME
  ? (process.env.DB_NAME as string)
  : null;
const username: string | null = process.env.DB_USER
  ? (process.env.DB_USER as string)
  : null;
const password: string | null = process.env.DB_PASSWORD
  ? (process.env.DB_PASSWORD as string)
  : null;


  console.log(dbname, username, password, process.env.DB_NAME);
const sequelize = new Sequelize(
  dbname,
  "root",
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);


export default sequelize