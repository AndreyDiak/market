import {
   MessageBody,
   OnGatewayConnection,
   OnGatewayDisconnect,
   OnGatewayInit,
   SubscribeMessage,
   WebSocketGateway,
   WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { CupService } from './cup/cup.service';
import { CUP_PAGINATION_LIMIT } from './utils/constants';
import { CupType } from './cup/types';

interface HandleCupGetBody {
   type: CupType;
}

type HandleCupUpdateBody = HandleCupGetBody;

@WebSocketGateway({
   cors: {
      origin: '*',
   },
   serverClient: false,
   namespace: 'cup',
})
export class CupGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
   constructor(private readonly cupService: CupService) {}

   private stockId: number;

   @WebSocketServer() server: Server;

   @SubscribeMessage('cupByStockId:get')
   async handleCupGet(client: Socket, { type }: HandleCupGetBody): Promise<void> {
      const cup = await this.cupService.findMany(
         {
            stockId: this.stockId,
            type,
            totalCount: {
               not: 0,
            },
         },
         {
            orderBy: {
               price: type === 'BUY' ? 'asc' : 'desc',
            },
            take: CUP_PAGINATION_LIMIT,
         },
      );

      this.server.emit('message:cupByStockId', cup, type);
   }

   @SubscribeMessage('cupByStockId:update')
   async handleCupUpdate(client: Socket, { type }: HandleCupUpdateBody) {
      this.handleCupGet(client, { type });
   }

   afterInit(server: Server) {
      console.log('connected');
   }

   handleConnection(client: Socket, ...args: any[]) {
      console.log(`${client.id} connected`);

      const { stockId: queryStockId } = client.handshake.query;

      this.stockId = Number(queryStockId);
      // type = queryType;
   }

   handleDisconnect(client: Socket) {
      console.log(`${client.id} disconnected`);
   }
}
