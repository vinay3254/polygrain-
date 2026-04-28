type JsonPrimitive = string | number | boolean | null;
type JsonArray = JsonValue[];
type JsonObject = {
    [key: string]: JsonValue;
};
type JsonValue = JsonPrimitive | JsonArray | JsonObject;
/**
 * Generate a pair of functions to load and save a value of type T to local storage.
 * @internal
 */
export declare function createLocalStorageInterface<T extends JsonValue>(key: string): {
    load: () => T | undefined;
    save: (value: T) => void;
};
export {};
//# sourceMappingURL=local-storage-helpers.d.ts.map