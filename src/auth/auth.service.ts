import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService

    ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);    
    const passwordIsMatched = await bcrypt.compare(pass,user.password)  

    if (user && passwordIsMatched) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async login(user: IUser) {
    const payload = { username: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
