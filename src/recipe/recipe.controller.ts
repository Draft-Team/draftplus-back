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
import { CreateRecipeRequestDTO } from './dtos/create-recipe.dto';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { RateRecipeRequestDTO } from './dtos/rate-recipe.dto';
import {
  UpdateRecipeRequestDTO,
  UpdateRecipeRequestParamDTO,
} from './dtos/update-recipe.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('recipe')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}
  @Post()
  create(@Body() data: CreateRecipeRequestDTO, @Req() req: Request) {
    return this.recipeService.create(data, req.user.id);
  }

  @Delete('/:recipe_id')
  deleteById(@Param() params: UpdateRecipeRequestParamDTO) {
    return this.recipeService.deleteById({ id: params.recipe_id });
  }

  @Post('/:recipe_id/rate')
  rate(
    @Body() data: RateRecipeRequestDTO,
    @Param() params: UpdateRecipeRequestParamDTO,
    @Req() req: Request,
  ) {
    return this.recipeService.rate(data, params.recipe_id, req.user.id);
  }

  @Put('/:recipe_id')
  update(
    @Body() data: UpdateRecipeRequestDTO,
    @Param() params: UpdateRecipeRequestParamDTO,
  ) {
    return this.recipeService.update(params.recipe_id, data);
  }
}
