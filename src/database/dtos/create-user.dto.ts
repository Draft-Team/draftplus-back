import { user } from '../entities/user.entity';

export type CreateUserDTO = Omit<typeof user.$inferInsert, 'id'>;
