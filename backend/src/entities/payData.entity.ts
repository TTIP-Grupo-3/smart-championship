import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChampionshipEnrollment } from './championshipEnrollment.entity';
import { EditPayData } from 'src/utils/types';

@Entity()
export class PayData {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => ChampionshipEnrollment, (enrollment) => enrollment.payData, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  enrollment: ChampionshipEnrollment;
  @Column()
  name: string;
  @Column()
  cuit: string;
  @Column()
  cbu: string;
  @Column()
  alias: string;

  edit({ name, cuit, cbu, alias }: EditPayData = {}) {
    this.name = name ?? this.name;
    this.cuit = cuit ?? this.cuit;
    this.cbu = cbu ?? this.cbu;
    this.alias = alias ?? this.alias;
  }
}
