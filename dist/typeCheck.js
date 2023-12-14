"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeCheck = exports.c = void 0;
exports.c = {
    bigint: BigInt(100000),
    boolean: true,
    number: 1,
    string: "",
    symbol: Symbol("x"),
    function: () => { },
};
const testObject = {
    url: "some",
    data: {
        someData: 10,
    },
};
const rootType = {
    data: {
        someData: exports.c.number,
    },
    url: exports.c.string,
};
const typeCheck = (verifiable, type) => {
    if (typeof verifiable !== typeof type) {
        return null;
    }
    if (typeof verifiable === "object" && typeof type === "object") {
        const entriesCheckedObject = Object.entries(verifiable).sort();
        const entriesTypeObject = Object.entries(type).sort();
        if (entriesCheckedObject.length !== entriesTypeObject.length) {
            return null;
        }
        for (let i = 0; i < entriesCheckedObject.length; i++) {
            let [keyCheckedObject, valueCheckedObject] = entriesCheckedObject[i];
            let [keyType, valueType] = entriesTypeObject[i];
            if (keyCheckedObject !== keyType) {
                return null;
            }
            if (typeof valueCheckedObject !== typeof valueType) {
                return null;
            }
            if ((typeof valueType === "function" &&
                typeof valueCheckedObject === "function") ||
                (typeof valueType === "object" &&
                    typeof valueCheckedObject === "object")) {
                if (Array.isArray(valueType) && Array.isArray(valueCheckedObject)) {
                    if (valueType.length !== valueCheckedObject.length) {
                        return null;
                    }
                    for (let i = 0; i < valueType.length; i++) {
                        let itemType = valueType[i];
                        let itemCheckedObject = valueCheckedObject[i];
                        if (typeof itemType !== typeof itemCheckedObject) {
                            return null;
                        }
                        if ((0, exports.typeCheck)(itemType, itemCheckedObject) === null) {
                            return null;
                        }
                    }
                }
                else if (valueCheckedObject &&
                    valueType &&
                    (0, exports.typeCheck)(valueCheckedObject, valueType) === null) {
                    return null;
                }
            }
        }
        return verifiable;
    }
    else {
        return verifiable;
    }
};
exports.typeCheck = typeCheck;
console.log((0, exports.typeCheck)(testObject, rootType));
console.log((0, exports.typeCheck)(exports.c.symbol, Symbol("y")));
