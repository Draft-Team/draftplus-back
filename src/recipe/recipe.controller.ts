import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateRecipeRequestDTO } from './dtos/create-recipe.dto';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { RateRecipeRequestDTO } from './dtos/rate-recipe.dto';
import {
  UpdateRecipeRequestDTO,
  UpdateRecipeRequestParamDTO,
} from './dtos/update-recipe.dto';

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
  deleteById(@Param() params: UpdateRecipeRequestParamDTO) {
    return this.recipeService.deleteById({ id: params.recipe_id });
  }

  @UseGuards(AuthGuard)
  @Post('/:recipe_id/rate')
  rate(
    @Body() data: RateRecipeRequestDTO,
    @Param() params: UpdateRecipeRequestParamDTO,
    @Req() req: Request,
  ) {
    return this.recipeService.rate(data, params.recipe_id, req.account.id);
  }

  @UseGuards(AuthGuard)
  @Put('/:recipe_id')
  update(
    @Body() data: UpdateRecipeRequestDTO,
    @Param() params: UpdateRecipeRequestParamDTO,
  ) {
    return this.recipeService.update(params.recipe_id, data);
  }
}
