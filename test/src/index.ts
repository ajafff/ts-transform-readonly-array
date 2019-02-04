export type T = Readonly<string[]>;
export type T2 = readonly (readonly string[])[];

const v: ReadonlyArray<string> = [];
export const v2 = v;

export type Tuple = readonly [1, 2];
