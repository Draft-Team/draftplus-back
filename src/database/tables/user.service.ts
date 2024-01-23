import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { user } from '../entities/user.entity';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DrizzleService) {}

  async create({ email, username, password, bio, profilePic }: CreateUserDTO) {
    const newUser = await this.dbService.db
      .insert(user)
      .values({ username, email, password, bio, profilePic })
      .returning();
    console.log(newUser);
    return newUser;
  }
}
