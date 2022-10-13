import { Min, IsEmail, IsNotEmpty } from 'class-validator';

export class Session {
  userId: string;
  email: string;
}

export class SignupDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Min(8)
  password: string;
}

export interface AuthRo {
  accessToken: string;
}
