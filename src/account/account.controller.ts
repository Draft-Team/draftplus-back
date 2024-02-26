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
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.accountService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(@Req() request: Request, @Body() body: UpdateAccountDTO) {
    const id = request.user.id;
    return this.accountService.update(id, body);
  }
}
