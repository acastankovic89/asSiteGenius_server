import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, In } from 'typeorm';
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

  async findAll() {
    try {
      const findAllUsers = await this.userRepository.find({
        where: {
          role: In(['Admin', 'Editor']),
        },
      });
      if (findAllUsers) {
        return {
          message: 'All users have been successfully retrieved.',
          response: findAllUsers,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong!',
          status: 401,
        };
      }
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
    }
  }

  async findOne(id: string) {
    try {
      const findUser = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      if (findUser) {
        return {
          message: 'User is successfully returned',
          response: findUser,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong!',
          status: 401,
        };
      }
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const findUser = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      console.log('find user', findUser);
      if (!findUser) {
        return {
          message: 'User not found.',
          status: 404,
        };
      }
      const updateUser: Partial<User> = {
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        email: updateUserDto.email,
        role: updateUserDto.role,
      };
      console.log(updateUserDto.password);
      if (updateUserDto.password) {
        updateUser.password = updateUserDto.password;
      }
      const response = await this.userRepository.save({
        ...findUser,
        ...updateUser,
      });
      console.log('response', response);
      if (response) {
        return {
          message: 'The user has been successfully updated.',
          response: response,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong.',
          status: 500,
        };
      }
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
    }
  }

  async remove(id: string) {
    try {
      const deleteUser = await this.userRepository.delete({ id: id });
      if (deleteUser) {
        return {
          message: 'User is successfully deleted.',
          response: deleteUser,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong.',
          status: 410,
        };
      }
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
    }
  }
}
