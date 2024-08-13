import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connection"; // Adjust the path as needed

interface PasswordAttributes {
  id: number;
  url: string;
  iv:any;
  key:any;
  password: string;
  userId?: number; // Make userId optional if it's not required
}

interface PasswordCreationAttributes
  extends Optional<PasswordAttributes, "id"> {}

class Password
  extends Model<PasswordAttributes, PasswordCreationAttributes>
  implements PasswordAttributes
{
  public id!: number;
  public url!: string;
  public iv!: string;
  public key!: string;
  public password!: string;
  public userId?: number;
}

Password.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type:DataTypes.STRING(1000),
      allowNull: false,
    },
    iv:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    key:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users", 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "Password",
  }
);

export default Password;