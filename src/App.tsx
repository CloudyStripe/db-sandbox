import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./home/Home";
import { Add } from "./operations/Add";
import { Edit } from "./operations/Edit";
import { Display } from "./operations/Display";
import { Delete } from "./operations/Delete";
import { useEffect, useState } from "react";
import { UserDB } from "./database/userDB";
import { UserContext } from "./context/userContext";
import './App.css';


export const App = () => {

  const [db, setDb] = useState<UserDB | null>(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/add",
      element: <Add />
    },
    {
      path: "/edit",
      element: <Edit />
    },
    {
      path: "/delete",
      element: <Delete />
    },
    {
      path: "/display",
      element: <Display/>
    }
  ]);


  useEffect(() => {
    const initializeDB = async () => {
      const userDB = new UserDB();
      await userDB.init();
      setDb(userDB);
    }
    initializeDB()
  }, [])

  return (
    <div>
      <UserContext.Provider value={db}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </div>
  )
}