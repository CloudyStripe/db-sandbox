import { createContext } from "react";
import { UserDB } from "../database/userDB";

export const UserContext = createContext<UserDB| null>(null);