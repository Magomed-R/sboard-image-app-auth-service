import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  email: string

  @Column('varchar')
  password: string

  @Column('timestamp', { generated: true, name: 'created_at' })
  createdAt: string
}
