import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("clients")
export default class Clients extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  is_enabled!: boolean;
}
