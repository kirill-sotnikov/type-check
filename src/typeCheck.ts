export const c = {
  number: 1,
  string: "",
  boolean: true,
  bigint: BigInt(100000),
  symbol: Symbol("x"),
  function: () => {},
};

export const typeCheck = <E, T>(schema: T, verifiable: E): T | null => {
  if (typeof verifiable !== typeof schema) {
    return null;
  }

  if (typeof verifiable === "object" && typeof schema === "object") {
    const entriesVerifiable = Object.entries(verifiable as object).sort();
    const entriesSchema = Object.entries(schema as object).sort();
    if (entriesVerifiable.length !== entriesSchema.length) {
      return null;
    }

    for (let i = 0; i < entriesVerifiable.length; i++) {
      let verifiableItem = {
        key: entriesVerifiable[i][0],
        value: entriesVerifiable[i][1],
      };

      let schemaItem = {
        key: entriesSchema[i][0],
        value: entriesSchema[i][1],
      };

      if (verifiableItem.key !== schemaItem.key) {
        return null;
      }

      if (typeof verifiableItem.value !== typeof schemaItem.value) {
        return null;
      }

      if (
        (typeof schemaItem.value === "function" &&
          typeof verifiableItem.value === "function") ||
        (typeof schemaItem.value === "object" &&
          typeof verifiableItem.value === "object")
      ) {
        if (
          Array.isArray(schemaItem.value) &&
          Array.isArray(verifiableItem.value)
        ) {
          if (schemaItem.value.length !== verifiableItem.value.length) {
            return null;
          }

          for (let i = 0; i < schemaItem.value.length; i++) {
            let itemOfType = schemaItem.value[i];
            let itemOfCheckedObject = verifiableItem.value[i];
            if (typeof itemOfType !== typeof itemOfCheckedObject) {
              return null;
            }
            if (typeCheck(itemOfType, itemOfCheckedObject) === null) {
              return null;
            }
          }
        } else if (
          verifiableItem.value &&
          schemaItem.value &&
          typeCheck(verifiableItem.value, schemaItem.value) === null
        ) {
          return null;
        }
      }
    }

    return verifiable as T;
  } else {
    return verifiable as unknown as T;
  }
};

typeCheck({ age: 10 }, { age: c.number });

console.log(typeCheck({ age: c.number }, { age: 10 }));
