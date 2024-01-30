import { Nullable } from '../types/nullable.type';

export interface IGenericRepository<Entity> {
  create(data: Entity): Promise<void>;
  findById(id: string): Promise<Nullable<Entity>>;
}
