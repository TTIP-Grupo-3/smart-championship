import { Column } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { Championship } from './championship.entity';
import { ChampionshipTeam } from './championshipTeam.entity';
import { EliminationChampionship } from './eliminationChampionship.entity';
import { Player } from './player.entity';

@Entity()
export class ChampionshipPlayer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  number: number;
  @Column()
  dni: number;
  @ManyToOne(() => ChampionshipTeam, (team) => team.players, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  team: ChampionshipTeam;
  @ManyToOne(() => EliminationChampionship, (championship) => championship.players, {
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  championship: Championship;
  @ManyToOne(() => Player, (player) => player.championshipPlayers, { createForeignKeyConstraints: false })
  player: Player;

  static from(player: Player, championship: Championship, team: ChampionshipTeam): ChampionshipPlayer {
    const championshipPlayer = new ChampionshipPlayer();
    championshipPlayer.name = player.name;
    championshipPlayer.number = player.number;
    championshipPlayer.dni = player.dni;
    championshipPlayer.team = team;
    championshipPlayer.championship = championship;
    championshipPlayer.player = player;
    return championshipPlayer;
  }
}
