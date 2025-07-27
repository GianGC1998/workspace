import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
}

export class BaseTimeEntity extends BaseEntity {
  @ApiProperty({ type: Date })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ type: Date })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ type: Date })
  @DeleteDateColumn()
  deletedAt: Date | null;
}
