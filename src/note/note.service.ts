import { Injectable } from '@nestjs/common';
import { Note, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoteService {
   constructor(private readonly prisma: PrismaService) {}

   async create(data: Prisma.NoteCreateManyInput): Promise<Note> {
      return this.prisma.note.create({
         data,
      });
   }

   async findMyNote(where: Prisma.NoteWhereInput): Promise<Note> {
      return this.prisma.note.findFirst({
         where,
      });
   }
}
