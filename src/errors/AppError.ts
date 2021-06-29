
class AppError {

  public readonly message: string;
  public readonly status: Number;

  constructor(message: string, status: Number) {
    this.message = message;
    this.status = status;
  }
}

export default AppError;