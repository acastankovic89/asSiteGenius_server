import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

interface Role {
  admin: string;
  editor: string;
  superAdmin: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: keyof Role;
}
