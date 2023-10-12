import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  static getRelations() {
    return ['posts',];
  }

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({ where: { email: createUserDto.email } })
    if (existUser) throw new BadGatewayException('Email already exists')
    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 6)
    })
    return `${user.email}: => user succesfully created`
  }

  findAll() {
    return this.userRepository.find({
      relations: ['posts']
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {id}
    })
    if(!user) {
      throw new NotFoundException('User not found')
    }
    return user  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email : email} })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {id}
    })
    if(!user) {
      throw new NotFoundException('User not found')
    }
    return await this.userRepository.update(id,updateUserDto);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: {id}
    })
    if(!user) {
      throw new NotFoundException('User not found')
    }
    return await this.userRepository.delete(id);
  }
}
