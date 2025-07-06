import { Request } from 'express';
import { UserOrmEntity } from 'src/infrastructure/database/entities/user.orm-entity';

export interface AuthenticatedRequest extends Request {
  user: UserOrmEntity;
}
