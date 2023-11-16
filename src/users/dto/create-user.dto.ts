interface Role {
  admin: string;
  editor: string;
  superAdmin: string;
}

export class CreateUserDto {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: keyof Role;
}
