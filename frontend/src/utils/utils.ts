export const ceilToNearestDecimal = (n: number, decimal = 2) => {
  const places = Math.pow(10, decimal);
  return Math.ceil(n * places) / places;
};

export const getISODate = (date?: Date | string | number) =>
  (date ? new Date(date) : new Date()).toISOString();


// TBD
// export type StrictPropertyCheck<T, U> = {
//   [P in keyof T]: P extends keyof U ? T[P] : never;
// };