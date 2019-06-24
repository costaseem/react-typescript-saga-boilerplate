/** Global definitions for development **/

// for stylus loader
declare module '*.styl' {
  const styles: any;
  export = styles;
}

// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

// Omit type https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-377567046
// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;