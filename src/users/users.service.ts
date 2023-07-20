import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LogInUserDto } from './dto/logIn-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const findUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (findUser) {
        return {
          message: 'User already exists.',
        };
      } else {
        const addUser = await this.userRepository.save(createUserDto);
        console.log('addUser', addUser);
        return {
          message: 'User succesefly created',
          status: 200,
          response: addUser,
        };
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  async logIn(LogInUserDto: LogInUserDto) {
    console.log('LogInUserDto', LogInUserDto);
    try {
      const findUser = await this.userRepository.findOne({
        where: { email: LogInUserDto.email },
      });

      if (!findUser) {
        console.log('findUser', findUser);
        return {
          message: "User with this email doese't exist!",
          status: 401,
        };
      } else {
        console.log('findUser', findUser);
        const isMatch = await bcrypt.compare(
          LogInUserDto.password,
          findUser.password,
        );
        if (!isMatch) {
          return {
            message: 'Wrong password',
            status: 401,
          };
        } else {
          return {
            message: 'User successfully logged',
            status: 200,
            response: findUser,
          };
        }
      }
    } catch (error) {
      if (error) throw error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
