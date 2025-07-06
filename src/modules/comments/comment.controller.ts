import {
  Controller,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthenticatedRequest } from 'src/common/types/authenticated-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateCommentCommand } from '../../application/comments/commands/create-comment.command';
import { GetCommentsByPostQuery } from '../../application/comments/queries/get-comments-by-post.query';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateCommentDto, @Req() req: AuthenticatedRequest) {
    return this.commandBus.execute(
      new CreateCommentCommand(
        dto.content,
        req.user.id,
        dto.postId,
      ),
    );
  }

  @Get('/post/:postId')
  getByPost(@Param('postId') postId: number) {
    return this.queryBus.execute(new GetCommentsByPostQuery(+postId));
  }
}
