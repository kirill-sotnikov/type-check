# Примеры

```ts
typeCheck({ name: c.string }, { name: "Vasya" });
// return: {name: "Vasya"}

typeCheck({ age: c.number }, { age: "some string" });
// return: null
```
