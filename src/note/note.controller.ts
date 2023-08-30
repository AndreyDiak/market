import {
   Body,
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   ParseIntPipe,
   Post,
   Query,
} from '@nestjs/common';
import { Note } from '@prisma/client';
import { GetCurrentUserId } from 'src/utils/decorators';
import { CreateNoteDto } from './dto/create-note.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
   constructor(private readonly noteService: NoteService) {}

   @Post('create')
   @HttpCode(HttpStatus.CREATED)
   async create(
      @GetCurrentUserId() userId: number,
      @Body() createNoteDto: CreateNoteDto,
   ): Promise<Note> {
      return this.noteService.create({
         ...createNoteDto,
         authorId: userId,
      });
   }

   @Get('findMyNote')
   async findByStockId(
      @GetCurrentUserId() userId: number,
      @Query('stockId', ParseIntPipe) stockId: number,
   ): Promise<Note> {
      return this.noteService.findMyNote({
         stockId,
         authorId: userId,
      });
   }
}
