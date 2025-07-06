export interface Author {
  id: number;
  username: string;
  email: string;
}

export class Post {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly content: string,
    public readonly authorId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly author?: Author,
  ) {}

  static create(
    title: string,
    content: string,
    authorId: number,
    id?: number,
  ): Post {
    const now = new Date();
    return new Post(
      id || 0,
      title,
      content,
      authorId,
      now,
      now,
    );
  }

  update(title?: string, content?: string): Post {
    return new Post(
      this.id,
      title || this.title,
      content || this.content,
      this.authorId,
      this.createdAt,
      new Date(),
      this.author,
    );
  }

  withAuthor(author: Author): Post {
    return new Post(
      this.id,
      this.title,
      this.content,
      this.authorId,
      this.createdAt,
      this.updatedAt,
      author,
    );
  }
}
