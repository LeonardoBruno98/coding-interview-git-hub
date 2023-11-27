import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class PageView {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  pageUrl: string

  @Column()
  pageTitle: string

  @Column("bigint")
  timestamp: number
}
