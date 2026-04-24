import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Avaliacao } from '../entities/avaliacao.entity';
import { AvaliacaoResponse } from '../dto/response/avaliacao.response';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/page.sistema';
import { AVALIACAO, fieldsAvaliacao } from '../constants/avaliacao.constants';

@Injectable()
export class AvaliacaoServiceList {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  async list(
    page: number,
    pageSize: number,
    props: string,
    order: 'ASC' | 'DESC',
    search?: string,
  ): Promise<Page<AvaliacaoResponse>> {
    const pageable = new Pageable(page, pageSize, props, order, fieldsAvaliacao);

    const [lista, totalElements] = await this.avaliacaoRepository.findAndCount({
      where: search ? { descricao: Like(`%${search}%`) } : {},
      order: { [pageable.props]: order } as any,
      skip: pageable.offset,
      take: pageable.limit,
    });

    const responses = lista.map((p) => new AvaliacaoResponse(p));

    return Page.of(responses, totalElements, pageable);
  }
}
