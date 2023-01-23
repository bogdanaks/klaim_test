import { Column, DeleteDateColumn, Entity, Index, PrimaryColumn } from "typeorm"
import { ISession } from "connect-typeorm"

@Entity({ name: "user_sessions" })
export class Session implements ISession {
  @PrimaryColumn("varchar", { length: 255 })
  public id = ""

  @Index()
  @Column("bigint")
  public expiredAt = Date.now()

  @Column("text")
  public json = ""

  @DeleteDateColumn()
  public destroyedAt?: Date
}
