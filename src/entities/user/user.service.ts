import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { ArticleService } from '../article/article.service.js';
import { buildUserResponseObject } from './user-utils/build-user-response-object.js';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => ArticleService))
    private readonly articleService: ArticleService,
  ) {}
  async getAll(): Promise<Omit<UserEntity, 'password'>[]> {
    const foundUsers = await this.userRepository.find();
    return foundUsers.map((user) => buildUserResponseObject(user));
  }

  async getByEmail(email: string): Promise<Omit<UserEntity, 'password'>> {
    const foundUser = await this.userRepository.findByEmail(email);
    return buildUserResponseObject(foundUser);
  }

  async registerUser(
    email: string,
    password: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    const foundUser = await this.userRepository.findByEmail(email);

    if (foundUser) {
      throw new HttpException(
        {
          message: 'User already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = new UserEntity();
    newUser.email = email;
    newUser.password = password;
    const savedUser = await this.userRepository.save(newUser);
    await this.articleService.createWelcomeArticle(savedUser);
    return buildUserResponseObject(savedUser);
  }

  async getUserWithArticles(userId: string): Promise<UserEntity> {
    const foundUser = await this.userRepository.findFullEntityById(userId);
    if (!foundUser) {
      throw new HttpException(
        {
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return foundUser;
  }

  async updateUser(
    userId: string,
    updateObj: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const foundUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!foundUser) {
      throw new HttpException(
        {
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const updatedUser = Object.assign(foundUser, updateObj);
    return this.userRepository.save(updatedUser);
  }
}
