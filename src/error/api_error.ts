class ApiError {
  code: number;
  message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  static unauthorized(msg?: string): ApiError {
    return new ApiError(401, msg ?? "Não autorizado");
  }

  static badRequest(msg?: string): ApiError {
    return new ApiError(400, msg ?? "Bad request");
  }

  static internal(msg?: string): ApiError {
    return new ApiError(500, msg ?? "Erro interno");
  }

  static notFound(msg?: string): ApiError {
    return new ApiError(404, msg ?? "Not found");
  }

  static conflict(msg?: string): ApiError {
    return new ApiError(409, msg ?? "Conflito");
  }
}

export { ApiError };
