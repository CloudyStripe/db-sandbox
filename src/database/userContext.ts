//give me a class template

export class UserContext {
    db: IDBDatabase | null;

    constructor() {
        this.db = null;
    }

    async init() {
        const connection = window.indexedDB.open('users');
        connection.onerror = () => {
            console.log('Error connecting to indexedDB')
        }
        connection.onsuccess = () => {
            this.db = connection.result;
        }
    }


}