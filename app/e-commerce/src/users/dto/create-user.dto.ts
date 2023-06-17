import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'user name is required' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'phone number is required' })
  @IsString()
  @IsMobilePhone()
  phoneNumber: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid email please enter correct email' })
  email: string;

  @IsNotEmpty({ message: 'password is required ' })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
