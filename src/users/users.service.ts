import { HttpException, HttpStatus, Injectable, forwardRef, Inject } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PortfolioService } from 'src/portfolio/portfolio.service';

@Injectable()
export class UsersService {
   constructor(
      private prisma: PrismaService,
      @Inject(forwardRef(() => PortfolioService))
      private readonly portfolioService: PortfolioService,
   ) {}

   async findOne(
      where: Prisma.UserWhereUniqueInput,
      select?: Prisma.UserSelect,
   ): Promise<Partial<User>> {
      return this.prisma.user.findUnique({
         where,
         select,
      });
   }

   async create(data: CreateUserDto): Promise<User> {
      const { email, name, password } = data;

      const isEmailAlreadyTaken = Boolean(await this.findOne({ email }));

      if (isEmailAlreadyTaken) {
         throw new HttpException('This email already taken', HttpStatus.FORBIDDEN);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
         email: email,
         name: name,
         password: hashedPassword,
      };

      const newUser = await this.prisma.user.create({ data: user });

      const { id } = newUser;

      // создаем портфолио для каждого юзера
      await this.portfolioService.create({ ownerId: id });

      return newUser;
   }

   async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
      return this.prisma.user.update({
         where: {
            id,
         },
         data,
      });
   }
}
