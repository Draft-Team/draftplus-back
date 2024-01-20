import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountDTO } from './dtos/create-account.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private service: AccountService) {}

  @Post()
  async create(@Body() body: CreateAccountDTO) {
    return this.service.create(body);
  }
}
