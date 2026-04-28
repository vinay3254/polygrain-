interface RegExOptions {
    /**
          Only match an exact string. Useful with `RegExp#test` to check if a string is a URL.
          @defaultValue false
          */
    readonly exact?: boolean;
}
export declare function createUrlRegExp(options: RegExOptions): RegExp;
export {};
//# sourceMappingURL=url-regex.d.ts.map