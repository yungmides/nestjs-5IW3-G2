import {Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards} from '@nestjs/common';
import {ListsService} from './lists.service';
import {CreateListDto} from './dto/create-list.dto';
import {UpdateListDto} from './dto/update-list.dto';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from 'src/auth/auth.guard';
import {ListsGuard} from "./lists.guard";
import {RolesGuard} from "../roles/roles.guard";
import {Roles} from "../roles/roles.decorator";
import {Role} from "../roles/roles.enum";

@ApiTags('lists')
@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}


  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  create(@Request() request, @Body() createListDto: CreateListDto) {
    return this.listsService.create(request.user.sub,createListDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findAll(@Request() request) {
    return this.listsService.findAll(request.user.sub);
  }

  @Get(':listId')
  @UseGuards(AuthGuard, ListsGuard)
  @ApiBearerAuth()
  findOne(@Param('listId') id: string) {
    return this.listsService.findOne(id);
  }

  @Patch(':listId')
  @UseGuards(AuthGuard, ListsGuard)
  @ApiBearerAuth()
  update(@Param('listId') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listsService.update(id, updateListDto);
  }

  @Delete(':listId')
  @UseGuards(AuthGuard, ListsGuard)
  @ApiBearerAuth()
  remove(@Param('listId') id: string) {
    return this.listsService.remove(id);
  }
}
