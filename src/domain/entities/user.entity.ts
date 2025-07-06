export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export class User {
  constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole,
    public readonly createdAt: Date,
  ) {}

  static create(
    username: string,
    email: string,
    password: string,
    role: UserRole = UserRole.USER,
    id?: number,
  ): User {
    const now = new Date();
    return new User(
      id || 0,
      username,
      email,
      password,
      role,
      now,
    );
  }

  update(username?: string, email?: string, role?: UserRole): User {
    return new User(
      this.id,
      username || this.username,
      email || this.email,
      this.password,
      role || this.role,
      this.createdAt,
    );
  }
}
