import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { UpdateAccountDTO } from './dtos/update-user.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountSerivce: AccountService) {}

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.accountSerivce.findById(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAccountDTO,
  ) {
    this.accountSerivce.update(id, body);
  }
}
