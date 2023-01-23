import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import { Author } from "../author/author.entity"

@Entity({ name: "quotes" })
export class Quote {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  author_id: number

  @OneToOne(() => Author)
  @JoinColumn({ name: "author_id" })
  author: Author

  @Column()
  quote: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
