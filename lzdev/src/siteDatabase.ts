const databaseName = 'lzdev-site-database';
const databaseVersion = 1;
const storeName = 'site-data';

type DatabaseRecord<T> = {
  key: string;
  value: T;
  updatedAt: string;
};

function canUseIndexedDb() {
  return typeof window !== 'undefined' && 'indexedDB' in window;
}

function readLocalRecord<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeLocalRecord<T>(key: string, value: T) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Browsers can block storage; the in-memory React state still keeps the current session usable.
  }
}

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (!canUseIndexedDb()) {
      reject(new Error('IndexedDB unavailable'));
      return;
    }

    const request = window.indexedDB.open(databaseName, databaseVersion);

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(storeName)) {
        database.createObjectStore(storeName, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function readDatabaseRecord<T>(key: string, fallback: T): Promise<T> {
  try {
    const database = await openDatabase();

    return await new Promise<T>((resolve, reject) => {
      const transaction = database.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        const record = request.result as DatabaseRecord<T> | undefined;
        resolve(record?.value ?? readLocalRecord(key, fallback));
      };
      request.onerror = () => reject(request.error);
      transaction.oncomplete = () => database.close();
    });
  } catch {
    return readLocalRecord(key, fallback);
  }
}

export async function writeDatabaseRecord<T>(key: string, value: T): Promise<void> {
  writeLocalRecord(key, value);

  try {
    const database = await openDatabase();

    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const record: DatabaseRecord<T> = {
        key,
        value,
        updatedAt: new Date().toISOString(),
      };

      store.put(record);
      transaction.oncomplete = () => {
        database.close();
        resolve();
      };
      transaction.onerror = () => reject(transaction.error);
    });
  } catch {
    // localStorage fallback already received the value.
  }
}

export function readCachedRecord<T>(key: string, fallback: T): T {
  return readLocalRecord(key, fallback);
}
