import { Offer } from '@prisma/client';

type OfferOnResult = 'update' | 'delete';

interface IdToUpdate {
   id: number;
   userId: number;
   count: number; // кол-во акций на которое надо понизить
   type: OfferOnResult;
}

interface CalculateOffers {
   idsToUpdate: IdToUpdate[];
}

export function calculateOffers(count: number, offers: Offer[]): CalculateOffers {
   let i = 0;
   const idsToUpdate: IdToUpdate[] = [];
   while (count > 0) {
      const offer = offers[i];

      const idToUpdate: IdToUpdate = {
         id: offer.id,
         userId: offer.userId,
      } as IdToUpdate;

      if (offer.count > count) {
         // update
         idToUpdate.count = count;
         idToUpdate.type = 'update';
         count = 0;
      } else {
         // delete
         idToUpdate.count = offer.count;
         idToUpdate.type = 'delete';
         count -= offer.count;
      }
      i++;
      idsToUpdate.push(idToUpdate);
   }

   return { idsToUpdate };
}
