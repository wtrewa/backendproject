import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connection"; // Adjust the path as needed

interface UserAttributes {
  id: number;
  name: string;
  googleId?: number | string;
  email: string;
  password?: string;
  isVerified: boolean;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "isVerified"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public googleId?: number | string;
  public name!: string;
  public email!: string;
  public password?: string;
  public isVerified!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association with Passwords
  public static associate(models: any) {
    User.hasMany(models.Password, {
      foreignKey: "userId",
      as: "passwords",
      onDelete: "CASCADE", // This will delete all associated passwords when a user is deleted
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["email", "googleId"],
      },
    ],
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

export default User;