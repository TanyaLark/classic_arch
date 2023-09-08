import { UserEntity } from '../user.entity.js';

export const buildUserResponseObject = (
  user: UserEntity,
): Omit<UserEntity, 'password'> => {
  delete user.password;
  return user;
};
