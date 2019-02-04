# ts-transform-readonly-array

TypeScript transformer to convert `readonly T[]` to `ReadonlyArray<T>` in declaration files.

## Why

Starting from v3.4.0 (or one of the nightly releases before that) TypeScript emits `readonly T[]` for readonly array types.
This breaks consumers of declaration files if they use an older version of TypeScript.

This transformer ensures that your declaration files can be used in older TypeScript versions as well.

It does not convert readonly tuple types in the form of `readonly [string, number]` as this is not supported in older versions of TypeScript.

## Usage with `ttypescript`

I wrote this transformer for use with [`ttypescript`](https://github.com/cevek/ttypescript).

You can configure it in your `tsconfig.json`:

```js
{
  "compilerOptions": {
    "declaration": true,
    "plugins": [
      { "transform": "ts-transform-readonly-array", "afterDeclarations": true },
    ]
  }
}
```

Note that you can use any `"type"` for the transformer: the default is `"type": "program"`, but it also works with `"type": "raw"` for example.

Afterwards you run `ttsc` as you would run `tsc`.

## Usage with `ts-loader`, `rollup`, and TypeScript's API

This package exports the necessary factory function to create the transformer. You can use this function to plug this transformer in any major TypeScript compilation pipeline.
Please refer to the API documentation of the tool you are using. Alternatively you can use [`ttypescript`](https://github.com/cevek/ttypescript) in most tools.
