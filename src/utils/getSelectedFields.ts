type Result<Key extends string | number | symbol> = Record<Key, boolean>;

export function getSelectedFields<T>(keys: (keyof T)[]): Result<keyof T> {
   return keys.reduce((acc, key) => {
      acc[key] = true;
      return acc;
   }, {} as Result<keyof T>);
}
