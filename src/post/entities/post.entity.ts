import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn({name: 'post_id'})
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({name: 'user_id'})
    user: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date 
}
