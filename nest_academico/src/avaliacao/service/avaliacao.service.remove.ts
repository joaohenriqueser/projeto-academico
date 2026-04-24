import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from '../entities/avaliacao.entity';
import { HttpException } from '@nestjs/common';

@Injectable()
export class AvaliacaoServiceRemove {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  async remove(id: number): Promise<boolean> {
    const avaliacao = await this.avaliacaoRepository.findOne({
      where: { idAvaliacao: id },
    });

    if (!avaliacao) {
      throw new HttpException('Avaliacao não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.avaliacaoRepository.remove(avaliacao);
    return true;
  }
}
