import { expect, test } from "vitest";
import { c, typeCheck } from "./typeCheck";

interface Test {
  name: string;
  checkedObject: unknown;
  typeObject: unknown;
  result: unknown | null;
}

const ioList: Array<Test> = [
  {
    name: "identical objects",
    typeObject: {
      lastName: c.string,
      age: c.number,
      students: [{ name: c.string }],
    },
    checkedObject: {
      lastName: "Me",
      age: 10,
      students: [{ name: "Josh" }],
    },
    result: {
      lastName: "Me",
      age: 10,
      students: [{ name: "Josh" }],
    },
  },
  {
    name: "random object parameters",
    typeObject: {
      lastName: c.string,
      age: c.number,
      students: [{ name: c.string }],
    },
    checkedObject: {
      age: 10,
      students: [{ name: "Josh" }],
      lastName: "Me",
    },
    result: {
      lastName: "Me",
      age: 10,
      students: [{ name: "Josh" }],
    },
  },
  {
    name: "not identical objects",
    typeObject: {
      lastName: c.string,
      age: c.number,
      students: [{ name: c.string }],
    },
    checkedObject: {
      age: "some stroke",
      students: [{ name: "Josh" }],
      lastName: "Me",
    },
    result: null,
  },
  {
    name: "primitive string",
    typeObject: c.string,
    checkedObject: "hello",
    result: "hello",
  },
  {
    name: "primitive number",
    typeObject: c.number,
    checkedObject: 101,
    result: 101,
  },
  {
    name: "primitive boolean",
    typeObject: c.boolean,
    checkedObject: false,
    result: false,
  },
];

for (let testParameters of ioList) {
  test(testParameters.name, () => {
    expect(
      (() => {
        return typeCheck(
          testParameters.typeObject,
          testParameters.checkedObject
        );
      })()
    ).toStrictEqual(testParameters.result as object);
  });
}

test("compare object with methods", () => {
  expect(
    (() => {
      return JSON.stringify({
        data: typeCheck(
          { age: c.number, go: c.function, do: c.function, lastName: c.string },
          {
            age: 10,
            go: () => {},
            do: () => {},
            lastName: "some",
          }
        ),
      });
    })()
  ).toStrictEqual(
    JSON.stringify({
      data: {
        age: 10,
        go: () => {},
        do: () => {},
        lastName: "some",
      },
    })
  );
});

test("primitive symbol", () => {
  expect(
    (() => {
      const checkedValue = typeCheck(c.symbol, Symbol("y"));

      if (checkedValue) {
        return checkedValue.toString();
      }
      return null;
    })()
  ).toEqual(Symbol("y").toString());
});

test("primitive bigInt", () => {
  expect(
    (() => {
      const checkedValue = typeCheck(c.bigint, BigInt("10"));

      if (checkedValue) {
        return checkedValue.toString();
      }
      return null;
    })()
  ).toEqual(BigInt("10").toString());
});
