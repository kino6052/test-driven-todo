export class Utils {
  static copy = <T>(obj: T) => JSON.parse(JSON.stringify(obj)) as T; 
}