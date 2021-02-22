import { User } from './user.entity';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { UserResponseDto } from './dto/user.dto';
import { GetUser } from './get-user-decorator';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  singUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    this.authService.singUp(authCredentialsDto);
  }

  @Get()
  getUsers(): Promise<UserResponseDto[]> {
    return this.authService.getUsers();
  }

  @Post('singIn')
  singIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    try {
      return this.authService.singIn(authCredentialsDto);
    } catch (error) {}
  }

  @Post('test')
  @UseGuards(AuthGuard('jwt'))
  test(@GetUser() user: User) {
    console.log(user);
  }
}
