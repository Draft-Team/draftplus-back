import { Nullable } from '../types/nullable.type';

export interface IGenericRepository<Entity> {
  create(data: Entity): Promise<void>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<Entity>): Promise<void>;
  findById(id: string): Promise<Nullable<Entity>>;
}
