export abstract class Mapper<Source = any, Target = any> {
  abstract map(source: Source): Target;
}
