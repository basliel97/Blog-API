import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostCommand } from '../../application/posts/commands/create-post.command';
import { UpdatePostCommand } from '../../application/posts/commands/update-post.command';
import { DeletePostCommand } from '../../application/posts/commands/delete-post.command';
import { GetAllPostsQuery } from '../../application/posts/queries/get-all-posts.query';
import { GetPostByIdQuery } from '../../application/posts/queries/get-post-by-id.query';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthenticatedRequest } from 'src/common/types/authenticated-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  findAll(@Query('search') search?: string) {
    return this.queryBus.execute(new GetAllPostsQuery(search));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetPostByIdQuery(+id));
  }

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  create(@Body() createPostDto: CreatePostDto, @Req() req: AuthenticatedRequest) {
    return this.commandBus.execute(
      new CreatePostCommand(
        createPostDto.title,
        createPostDto.content,
        req.user.id,
      ),
    );
  }
  
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.commandBus.execute(
      new UpdatePostCommand(
        +id,
        req.user.id,
        updatePostDto.title,
        updatePostDto.content,
      ),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.commandBus.execute(
      new DeletePostCommand(+id, req.user.id),
    );
  }
}
