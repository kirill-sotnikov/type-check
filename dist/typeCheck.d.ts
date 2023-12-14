export declare const c: {
    bigint: bigint;
    boolean: boolean;
    number: number;
    string: string;
    symbol: symbol;
    function: () => void;
};
export declare const typeCheck: <E, T>(verifiable: E, type: T) => T | null;
