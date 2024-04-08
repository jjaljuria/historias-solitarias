import { config } from "dotenv";

config();

export default {
  PORT: process.env.PORT || 3000,
  DATABASE_URI:
    process.env.DATABASE_URI ||
    "mongodb://localhost:27017/historias_solitarias",
};
