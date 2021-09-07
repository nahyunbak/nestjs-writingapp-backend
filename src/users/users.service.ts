import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;
//몽고db 써넣기.
//users는 말이여. 몽고db로다가 저장해둔 그런 유저 id와 password들이여. 알간?

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
