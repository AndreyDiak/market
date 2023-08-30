import {
   OnGatewayConnection,
   OnGatewayDisconnect,
   OnGatewayInit,
   SubscribeMessage,
   WebSocketGateway,
   WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { DealService } from './deal.service';

@WebSocketGateway({
   cors: {
      origin: '*',
   },
   serverClient: false,
   namespace: 'deal',
})
export class DealGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
   constructor(private readonly dealSerivce: DealService) {}

   private stockId: number;

   @WebSocketServer() server: Server;

   @SubscribeMessage('lastDealByStockId:get')
   async handleDealGet(): Promise<void> {
      const deal = await this.dealSerivce.findLatest({
         stockId: this.stockId,
      });

      this.server.emit('message:lastDealByStockId', deal);
   }

   @SubscribeMessage('lastDealByStockId:update')
   async handleCupUpdate() {
      this.handleDealGet();
   }

   afterInit(server: Server) {
      console.log('connected');
   }

   handleConnection(client: Socket, ...args: any[]) {
      console.log(`${client.id} connected`);

      this.stockId = Number(client.handshake.query.stockId);
   }

   handleDisconnect(client: Socket) {
      console.log(`${client.id} disconnected`);
   }
}
