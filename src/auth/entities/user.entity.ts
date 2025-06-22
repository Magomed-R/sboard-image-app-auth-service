import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  email: string

  @Column('text')
  password: string

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date
}
