export interface User {
    username: string;
    email: string;
    dob: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  }

export interface  IUsersModificationResponse {
  userName: string;
  message: string;
}

export interface IRetrieveUserDbResponse {
  user: User | null;
  message: string;
}
export interface IRetrieveUsersDbResponse {
  users: User[] | null;
  message: string;
}