import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ViolationBaseDto } from '../dto/violation-base.dto';
import { SIO_VIOLATIONS_EVENT } from '../constants/events';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ViolationsGateway {
  @WebSocketServer()
  private server: Server;

  violation(data: ViolationBaseDto): void {
    this.server.emit(SIO_VIOLATIONS_EVENT.VIOLATION, data);
  }
}
