export interface Author {
  id: number;
  username: string;
  email: string;
}

export class Comment {
  constructor(
    public readonly id: number,
    public readonly content: string,
    public readonly postId: number,
    public readonly authorId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly author?: Author,
  ) {}

  static create(
    content: string,
    postId: number,
    authorId: number,
    id?: number,
  ): Comment {
    const now = new Date();
    return new Comment(
      id || 0,
      content,
      postId,
      authorId,
      now,
      now,
    );
  }

  update(content: string): Comment {
    return new Comment(
      this.id,
      content,
      this.postId,
      this.authorId,
      this.createdAt,
      new Date(),
      this.author,
    );
  }

  withAuthor(author: Author): Comment {
    return new Comment(
      this.id,
      this.content,
      this.postId,
      this.authorId,
      this.createdAt,
      this.updatedAt,
      author,
    );
  }
}
