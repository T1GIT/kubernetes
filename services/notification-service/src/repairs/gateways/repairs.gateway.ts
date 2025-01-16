import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RepairBaseDto } from '../dto/repair-base.dto';
import { SIO_REPAIRS_EVENT } from '@/repairs/constants/events';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RepairsGateway {
  @WebSocketServer()
  private server: Server;

  repair(data: RepairBaseDto): void {
    this.server.emit(SIO_REPAIRS_EVENT.REPAIR, data);
  }
}
