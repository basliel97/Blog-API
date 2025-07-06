# Clean Architecture with Repository Pattern and CQRS

This project has been restructured to follow Clean Architecture principles with Repository Pattern and Command Query Responsibility Segregation (CQRS).

## Architecture Overview

### Layers

1. **Domain Layer** (`src/domain/`)
   - Pure business entities without framework dependencies
   - Repository interfaces defining contracts
   - Business rules and domain logic

2. **Application Layer** (`src/application/`)
   - Use cases implemented as Commands and Queries (CQRS)
   - Command and Query handlers
   - Business logic orchestration

3. **Infrastructure Layer** (`src/infrastructure/`)
   - Repository implementations
   - Database entities (ORM)
   - External service integrations

4. **Presentation Layer** (`src/modules/`)
   - Controllers
   - DTOs
   - HTTP request/response handling

## Key Features

### Repository Pattern
- **Domain Repositories**: Define contracts in the domain layer
- **Infrastructure Repositories**: Implement the contracts with specific technologies
- **Dependency Injection**: Uses tokens for clean dependency injection

### CQRS (Command Query Responsibility Segregation)
- **Commands**: Handle write operations (Create, Update, Delete)
- **Queries**: Handle read operations (Get, Find, Search)
- **Command Handlers**: Implement business logic for write operations
- **Query Handlers**: Implement logic for read operations

## Project Structure

```
src/
├── domain/
│   ├── entities/
│   │   ├── post.entity.ts
│   │   ├── user.entity.ts
│   │   └── comment.entity.ts
│   └── repositories/
│       ├── post.repository.ts
│       ├── user.repository.ts
│       ├── comment.repository.ts
│       └── tokens.ts
├── application/
│   ├── posts/
│   │   ├── commands/
│   │   │   ├── create-post.command.ts
│   │   │   ├── update-post.command.ts
│   │   │   ├── delete-post.command.ts
│   │   │   └── handlers/
│   │   └── queries/
│   │       ├── get-all-posts.query.ts
│   │       ├── get-post-by-id.query.ts
│   │       └── handlers/
│   └── users/
│       ├── commands/
│       │   ├── create-user.command.ts
│       │   ├── update-user.command.ts
│       │   ├── delete-user.command.ts
│       │   └── handlers/
│       └── queries/
│           ├── get-all-users.query.ts
│           ├── get-user-by-id.query.ts
│           └── handlers/
├── infrastructure/
│   └── database/
│       ├── entities/
│       │   ├── post.orm-entity.ts
│       │   ├── user.orm-entity.ts
│       │   └── comment.orm-entity.ts
│       └── repositories/
│           ├── post.repository.impl.ts
│           ├── user.repository.impl.ts
│           └── comment.repository.impl.ts
└── modules/
    ├── posts/
    │   ├── post.controller.ts
    │   ├── post.module.ts
    │   └── dto/
    ├── users/
    │   ├── users.controller.ts
    │   ├── user.module.ts
    │   └── dto/
    └── auth/
```

## Usage Examples

### Creating a Post
```typescript
// Controller
@Post()
create(@Body() createPostDto: CreatePostDto, @Req() req: AuthenticatedRequest) {
  return this.commandBus.execute(
    new CreatePostCommand(
      createPostDto.title,
      createPostDto.content,
      req.user.id,
    ),
  );
}

// Command Handler
@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async execute(command: CreatePostCommand): Promise<Post> {
    const post = Post.create(
      command.title,
      command.content,
      command.authorId,
    );
    return this.postRepository.create(post);
  }
}
```

### Getting All Posts
```typescript
// Controller
@Get()
findAll(@Query('search') search?: string) {
  return this.queryBus.execute(new GetAllPostsQuery(search));
}

// Query Handler
@QueryHandler(GetAllPostsQuery)
export class GetAllPostsHandler implements IQueryHandler<GetAllPostsQuery> {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async execute(query: GetAllPostsQuery): Promise<Post[]> {
    if (query.searchTerm) {
      return this.postRepository.searchByTitleOrContent(query.searchTerm);
    }
    return this.postRepository.findAll();
  }
}
```

## Benefits

1. **Separation of Concerns**: Clear boundaries between layers
2. **Testability**: Easy to unit test business logic in isolation
3. **Maintainability**: Changes in one layer don't affect others
4. **Scalability**: Easy to add new features or change implementations
5. **Domain-Driven Design**: Business logic is centralized in domain entities
6. **CQRS Benefits**: Optimized read and write operations, better performance

## Dependencies

- `@nestjs/cqrs`: For CQRS implementation
- `@nestjs/typeorm`: For database operations
- `typeorm`: ORM for database management
- `bcrypt`: For password hashing

## Next Steps

1. Implement Comment module with CQRS
2. Add event sourcing for audit trails
3. Implement read models for complex queries
4. Add validation pipes and error handling
5. Implement caching strategies
6. Add comprehensive unit and integration tests 