import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateRecipeRequestDTO } from './dtos/create-recipe.dto';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { RateRecipeDTO } from './dtos/rate-recipe.dto';

@Controller('recipe')
@ApiTags('Recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: CreateRecipeRequestDTO, @Req() req: Request) {
    return this.recipeService.create(data, req.account.id);
  }

  @UseGuards(AuthGuard)
  @Delete('/:recipe_id')
  deleteById(@Param('recipe_id') recipe_id: string) {
    return this.recipeService.deleteById({ id: recipe_id });
  }

  @UseGuards(AuthGuard)
  @Post('/:recipe_id/rate')
  rate(
    @Body() data: RateRecipeDTO,
    @Param('recipe_id') recipe_id: string,
    @Req() req: Request,
  ) {
    this.recipeService.rate(data, recipe_id, req.account.id);
  }
}
