export declare class Future<T, E extends Error> {
    promise: Promise<T>;
    resolve?: (arg: T) => void;
    reject?: (e: E) => void;
    onFinally?: () => void;
    get isResolved(): boolean;
    private _isResolved;
    constructor(futureBase?: (resolve: (arg: T) => void, reject: (e: E) => void) => void, onFinally?: () => void);
}
//# sourceMappingURL=future.d.ts.map