import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { UpdateAccountDTO } from './dtos/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@Controller('account')
export class AccountController {
  constructor(private readonly accountSerivce: AccountService) {}

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.accountSerivce.findById(id);
  }

  @UseGuards(AuthGuard)
  @Put()
  update(@Req() request: Request, @Body() body: UpdateAccountDTO) {
    const id = request.account.id;
    this.accountSerivce.update(id, body);
  }
}
