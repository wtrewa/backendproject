"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const googleAuthRoutes_1 = __importDefault(require("./routes/googleAuthRoutes"));
const verifyEmail_1 = __importDefault(require("./routes/verifyEmail"));
const index_1 = __importDefault(require("./models/index"));
const passwordRoutes_1 = __importDefault(require("./routes/passwordRoutes"));
const password_1 = __importDefault(require("./models/password"));
const User_1 = __importDefault(require("./models/User"));
const SequelizeStore = (0, connect_session_sequelize_1.default)(express_session_1.default.Store);
const app = (0, express_1.default)();
const PORT = 8080;
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)());
app.use("/auth", googleAuthRoutes_1.default);
app.use("/api", authRoutes_1.default);
app.use("/api", verifyEmail_1.default);
app.use('/api', passwordRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to the home page");
});
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on port ${PORT}`);
    try {
        index_1.default.User.associate({ Password: password_1.default });
        index_1.default.Password.belongsTo(User_1.default, { foreignKey: "userId" });
        yield index_1.default.sequelize.authenticate();
        // await db.sequelize.sync({alter:true})
        console.log("Database connected!");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}));
//# sourceMappingURL=app.js.map