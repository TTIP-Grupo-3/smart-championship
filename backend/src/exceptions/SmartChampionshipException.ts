export abstract class SmartChampionshipException extends Error {
  public get name(): string {
    return Object.getPrototypeOf(this).constructor.name;
  }
}
