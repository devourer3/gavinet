interface isDev {
  IS_DEV: boolean
}

export const IS_DEV = true;

export function logObjectToJson(object:object) {
  console.log(`JSON: ${JSON.stringify(object)}`);
}

// export function getJson(object:object) {
//   return JSON.parse(JSON.stringify(object));
// }
