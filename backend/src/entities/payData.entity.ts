import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChampionshipEnrollment } from './championshipEnrollment.entity';

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
}
