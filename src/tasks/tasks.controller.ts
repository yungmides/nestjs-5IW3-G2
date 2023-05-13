import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {ApiBearerAuth, ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";
import { AuthGuard } from 'src/auth/auth.guard';
import { ListsGuard } from 'src/lists/lists.guard';

@ApiTags('tasks')
@Controller('lists/:listId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard, ListsGuard)
  @ApiBearerAuth()
  @ApiParam({name: 'listId'})
  create(@Param('listId', ParseUUIDPipe) listId: string , @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(listId, createTaskDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
