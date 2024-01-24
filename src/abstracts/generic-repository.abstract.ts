export interface IGenericRepository<Entity> {
  create(data: Entity): Promise<void>;
}
