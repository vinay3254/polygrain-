declare const SerializerSymbol: unique symbol;
/**
 * A bidirectional data format descriptor for message payloads.
 *
 * - `parse(raw)` decodes an incoming wire string into `Input` (used by handlers)
 * - `serialize(val)` encodes an `Output` value to a wire string (used by handlers)
 *
 * For symmetric serializers (`serializers.raw`), `Input === Output === string`.
 * For `serializers.json`, both default to `any` so each handler can annotate its own types.
 * Use `serializers.custom` to supply your own `parse`/`serialize` pair.
 *
 * @beta
 */
export type Serializer<Input, Output> = {
    symbol: typeof SerializerSymbol;
    parse: (raw: string) => Input;
    serialize: (val: Output) => string;
};
export declare function isSerializer(v: unknown): v is Serializer<any, any>;
export type SerializerInput<S> = S extends Serializer<infer Input, any> ? Input : any;
export type SerializerOutput<S> = S extends Serializer<any, infer Output> ? Output : any;
/**
 * JSON serializer — `JSON.parse` on the way in, `JSON.stringify` on the way out.
 * Defaults to `any` so individual handlers can annotate their own payload types.
 */
declare function json<Input = any, Output = any>(): Serializer<Input, Output>;
/** Raw string serializer — passes payloads through as plain strings with no encoding. */
declare function raw(): Serializer<string, string>;
/** Custom serializer - allows custom defined parse and serialize functions */
declare function custom<Input = any, Output = any>(params: Omit<Serializer<Input, Output>, 'symbol'>): Serializer<Input, Output>;
/**
 * Serializer helpers for message payload encoding.
 *
 * @example
 * ```ts
 * const a = serializers.raw(); // Serializer<string, string>
 * const b = serializer.json<{ foo: string }, { bar: string }>(); // Serializer<{ foo: string }, { bar: string }>
 * ```
 *
 * @beta
 */
export declare const serializers: {
    json: typeof json;
    raw: typeof raw;
    custom: typeof custom;
};
export {};
//# sourceMappingURL=serializer.d.ts.map