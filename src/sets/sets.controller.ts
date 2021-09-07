import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateSetDto } from 'src/dto/create-set.dto';
import { SetsService } from './sets.service';

@Controller('sets')
export class SetsController {
  constructor(private setsService: SetsService) {}

  @Post(':id')
  async create(@Body() createSetDto: CreateSetDto) {
    await this.setsService.create(createSetDto);
  }
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
