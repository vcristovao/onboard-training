import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Client from "./client.entity";

@Entity("items")
export default class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  client_id!: number;

  @ManyToOne(() => Client, (client) => client)
  @JoinColumn({ name: "client_id" })
  client!: Client;
}
