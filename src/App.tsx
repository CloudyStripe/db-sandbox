import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./home/Home";
import { Add } from "./operations/Add";
import { Edit } from "./operations/Edit";
import { Retrieve } from "./operations/Retrieve";
import { Delete } from "./operations/Delete";
import { useEffect, useState } from "react";
import { UserDB } from "./database/userDB";
import { UserContext } from "./context/userContext";
import './App.css';


export const App = () => {

  const [isLoading, setIsLoading] = useState(true);
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
      path: "/retrieve",
      element: <Retrieve/>
    }
  ]);


  useEffect(() => {
    const initializeDB = async () => {
      const userDB = new UserDB();
      await userDB.init();
      setDb(userDB);
      setIsLoading(false);
    }
    initializeDB()
  }, [])

  return (
    <div>
      <UserContext.Provider value={db}>
        {isLoading ? <div>Loading...</div> : <RouterProvider router={router} />}
      </UserContext.Provider>
    </div>
  )
}