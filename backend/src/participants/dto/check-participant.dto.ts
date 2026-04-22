import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CheckParticipantDto {
  @IsString()
  @IsNotEmpty({ message: 'กรุณากรอกชื่อ' })
  @MinLength(1)
  @MaxLength(100)
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'กรุณากรอกนามสกุล' })
  @MinLength(1)
  @MaxLength(100)
  lastName: string;
}
