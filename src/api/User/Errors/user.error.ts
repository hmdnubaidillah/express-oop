export class UserError {
  public error(message: string) {
    if (message === "E11000") {
      console.log(message);
      return "Duplicate username";
    }
  }
}
