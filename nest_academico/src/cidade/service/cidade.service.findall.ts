import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/page.sistema';
import { CIDADE, fieldsCidade } from '../constants/cidade.constants';
import { ConverterCidade } from '../dto/converter/cidade.converter';
import { CidadeResponse } from '../dto/response/cidade.response';
import { Cidade } from '../entity/cidade.entity';

@Injectable()
export class CidadeServiceFindAll {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
  ) {}

  async findAll(
    page: number,
    pageSize: number,
    props: string,
    order: 'ASC' | 'DESC',
    search?: string,
  ): Promise<Page<CidadeResponse>> {
    const pageable = new Pageable(page, pageSize, props, order, fieldsCidade);

    const [listaCidades, totalElements] = await this.cidadeRepository.findAndCount({
      where: search ? { nomeCidade: Like(`%${search}%`) } : {},
      order: { [pageable.props]: order } as any,
      skip: pageable.offset,
      take: pageable.limit,
    });

    const cidades = ConverterCidade.toListCidadeResponse(listaCidades);

    return Page.of(cidades, totalElements, pageable);
  }
}
