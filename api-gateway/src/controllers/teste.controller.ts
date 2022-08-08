import { Get, Route } from "tsoa";

interface PingResponse {
  message: string;
}

@Route("teste")
class TesteController {
  @Get("/")
  public async getMessage(): Promise<PingResponse> {
    return {
      message: "pong",
    };
  }
}

export default new TesteController()
