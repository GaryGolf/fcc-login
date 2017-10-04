/** Global definitions for developement **/

// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

declare module '*.png' {
  const icon: any;
  export = icon;
}

// for redux devtools extension
declare interface Window {
  devToolsExtension?(): (args?: any) => any;
}
// enviroment constant
declare const PRODUCTION: boolean
declare const NODE_ENV: any