import type { Throws } from '@livekit/throws-transformer/throws';
/** An error which is thrown if a {@link DeferrableMap#getDeferred} call is aborted midway
 * through. */
export declare class DeferrableMapAbortError extends DOMException {
    reason: unknown;
    constructor(message: string, reason?: unknown);
}
/**
 * A Map-like container keyed by unique strings that supports the ability to wait
 * for future keys to show up in the map.
 *
 * @example
 * // An already existing key:
 * const value = map.get("key");
 * // Wait for a key which will be added soon:
 * const value = await map.getDeferred("key");
 */
export declare class DeferrableMap<K, V> extends Map<K, V> {
    private pending;
    set(key: K, value: V): this;
    get [Symbol.toStringTag](): string;
    /**
     * Returns the value for `key` immediately if it exists, otherwise returns a
     * promise that resolves once `set(key, value)` is called.
     *
     * If an `AbortSignal` is provided and it is aborted before the key appears,
     * the returned promise rejects with an {@link DeferrableMapAbortError}.
     */
    getDeferred(key: K): Promise<V>;
    getDeferred(key: K, signal: AbortSignal): Promise<Throws<V, DeferrableMapAbortError>>;
}
//# sourceMappingURL=deferrable-map.d.ts.map
