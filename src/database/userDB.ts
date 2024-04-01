import { IUsersModificationResponse, IRetrieveUserDbResponse, IRetrieveUsersDbResponse, User } from "../types/userTypes";

export class UserDB {
    private _db: IDBDatabase | null;

    constructor() {
        this._db = null;
    }

    async init() {
        const connection = window.indexedDB.open('skylerSampleDB');

        connection.onerror = () => {
            console.log('Error connecting to indexedDB')
        }
        connection.onsuccess = () => {
            this._db = connection.result;
        }

        connection.onupgradeneeded = (event) => {
            this._db = (event.target as IDBOpenDBRequest).result;
            //in-line key
            const store = this._db.createObjectStore('users', { keyPath: 'email' });

            store.createIndex('username', 'username', { unique: true });
            store.createIndex('dob', 'dob', { unique: false });
            store.createIndex('street', 'street', { unique: false });
            store.createIndex('city', 'city', { unique: false });
            store.createIndex('state', 'state', { unique: false });
            store.createIndex('zip', 'zip', { unique: false });
        }
    }

    async addUser(user: User, successCallback: (addUserSucess: IUsersModificationResponse) => void, errorCallback: (addUserError: IUsersModificationResponse) => void) {
        if (this._db) {
            const transaction = this._db.transaction('users', 'readwrite');
            const store = transaction.objectStore('users');
            const request = store.add(user);

            request.onsuccess = (event) => {
                const addedUser = (event.target as IDBRequest).result;

                if (addedUser) {
                    successCallback({
                        userName: user.username,
                        message: 'User added successfully.'
                    });
                }
            },

            request.onerror = (event) => {
                const error = (event.target as IDBRequest).error?.message;

                errorCallback({
                    userName: user.username,
                    message: error || 'Unexpected error retrieving user.'
                });
            }
        }
    }

    async getUser(email: string, successCallback: (retrieveUserSucess: IRetrieveUserDbResponse) => void, errorCallback: (retrieveUserError: IRetrieveUserDbResponse) => void) {
        if (this._db) {
            const transaction = this._db.transaction('users', 'readonly');
            const store = transaction.objectStore('users');
            const request = store.get(email);

            request.onsuccess = (event) => {
                const retrievedUser = (event.target as IDBRequest).result;

                if (retrievedUser) {
                    successCallback({
                        user: retrievedUser,
                        message: 'User retrieved successfully.'
                    });
                }
                if (!retrievedUser) {
                    successCallback({
                        user: null,
                        message: 'User not found.'

                    })
                }
            }

            request.onerror = (event) => {
                const error = (event.target as IDBRequest).error?.message;

                errorCallback({
                    user: null,
                    message: error || 'Unexpected error retrieving user.'
                });
            }
        }
    }

    async getAllUsers(successCallback: (retrieveUserSucess: IRetrieveUsersDbResponse) => void, errorCallback: (retrieveUsersError: IRetrieveUsersDbResponse) => void) {
        if (this._db) {
            const transaction = this._db.transaction('users', 'readonly');
            const store = transaction.objectStore('users');

            const request = store.getAll();

            request.onsuccess = (event) => {
                const retrievedUsers = (event.target as IDBRequest).result;

                if (retrievedUsers) {
                    successCallback({
                        users: retrievedUsers,
                        message: 'Users retrieved successfully.'
                    });
                }
                if (!retrievedUsers) {
                    successCallback({
                        users: null,
                        message: 'No users found.'
                    });
                }
            }

            request.onerror = (event) => {
                const error = (event.target as IDBRequest).error?.message;

                errorCallback({
                    users: null,
                    message: error || 'Unexpected error retrieving users.'
                });
            }
        }
    }

    async deleteUser(email: string, successCallback: (deleteUserSucess: IUsersModificationResponse) => void, errorCallback: (deleteUserError: IUsersModificationResponse) => void) {
        if (this._db) {
            const transaction = this._db.transaction('users', 'readwrite');
            const store = transaction.objectStore('users');
            const request = store.delete(email);

            request.onsuccess = () => {

                successCallback({
                    userName: email,
                    message:  `User ${email} deleted successfully.`
                });
                
            }

            request.onerror = (event) => {
                const error = (event.target as IDBRequest).error?.message;

                errorCallback({
                    userName: email,
                    message: error || 'Unexpected error deleting user.'
                });
            }
        }
    }

    async editUser(user: User, successCallback: (editUserSucess: IUsersModificationResponse) => void, errorCallback: (editUserError: IUsersModificationResponse) => void) {
        if (this._db) {
            const transaction = this._db.transaction('users', 'readwrite');
            const store = transaction.objectStore('users');
            const request = store.put(user);

            request.onsuccess = () => {
                successCallback({
                    userName: user.username,
                    message: `User ${user.username} successfully edited.`
                });
            }

            request.onerror = (event) => {
                const error = (event.target as IDBRequest).error?.message;

                errorCallback({
                    userName: user.username,
                    message: error || 'Unexpected error editing user.'
                });
            }
        }
    }
}