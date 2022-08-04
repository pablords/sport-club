export class LoggerMiddlewareDtoCreate {
  traceId: string
  middleware: string;
  ip: string;
  method: string;
  path: string;
  host: string;
  agent: string | string[];
  platform: string | string[]
  origin: string;
  token: string;
}
