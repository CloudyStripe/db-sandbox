export interface User {
    username: string;
    email: string;
    dob: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  }

export interface AddDeleteUserDbResponse {
  userName: string;
  message: string;
}

export interface RetrieveUserDbResponse {
  user: User | null;
  message: string;
}
export interface RetrieveUsersDbResponse {
  users: User[] | null;
  message: string;
}