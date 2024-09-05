import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("clients")
export default class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  is_enabled!: boolean;
}
