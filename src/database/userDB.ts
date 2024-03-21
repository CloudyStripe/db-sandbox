import { User } from "../types/userTypes";

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
            const store = this._db.createObjectStore('users', { keyPath: 'email' });

            store.createIndex('username', 'username', { unique: true });
            store.createIndex('dob', 'dob', { unique: false });
            store.createIndex('street', 'street', { unique: false });
            store.createIndex('city', 'city', { unique: false });
            store.createIndex('state', 'state', { unique: false });
            store.createIndex('zip', 'zip', { unique: false });
        }
    }

    async addUser(user: User) {
        if (this._db) {
            const transaction = this._db.transaction('users', 'readwrite');
            const store = transaction.objectStore('users');

            const request = store.add(user);

            request.onsuccess = (event) => {
                const addedUser = (event.target as IDBRequest).result;
                console.log(addedUser)
            }
        }
    }
}