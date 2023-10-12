import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>
  ) { }
  async create(createPostDto: CreatePostDto, id: number) {
    const newPost = {
      title: createPostDto.title,
      description: createPostDto.description,
      user: { id }
    }
    if (!newPost) {
      throw new BadRequestException('Something went wrong')
    }
    return await this.postRepository.save(newPost);
  }

  async findAll(id: number) {
    const posts = await this.postRepository.find({
      where: {
        user: { id }
      }
    })
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postRepository.find({
      where: {
        id,
      },
      relations: {
        user: true
      }
    })
    return post
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.find({
      where: {
        id,
      }
    })
    if (!post) {
      throw new NotFoundException('Post not found')
    }
    return this.postRepository.update(id,updatePostDto);
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
