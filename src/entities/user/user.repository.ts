import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity.js';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({ where: { email } });
  }

  async deleteById(id: string): Promise<UserEntity> {
    const userToDelete = await this.findOne({ where: { id } });
    return await this.remove(userToDelete);
  }

  async findFullEntityById(id: string): Promise<UserEntity> {
    return await this.findOne({ where: { id }, relations: ['articles'] });
  }
}
