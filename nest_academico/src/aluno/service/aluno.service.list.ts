import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Aluno } from '../entities/aluno.entity';
import { AlunoResponse } from '../dto/response/aluno.response';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/page.sistema';
import { ALUNO, fieldsAluno } from '../constants/aluno.constants';

@Injectable()
export class AlunoServiceList {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,
  ) {}

  async list(
    page: number,
    pageSize: number,
    props: string,
    order: 'ASC' | 'DESC',
    search?: string,
  ): Promise<Page<AlunoResponse>> {
    const pageable = new Pageable(page, pageSize, props, order, fieldsAluno);

    const [lista, totalElements] = await this.alunoRepository.findAndCount({
      where: search ? { nomeAluno: Like(`%${search}%`) } : {},
      order: { [pageable.props]: order } as any,
      skip: pageable.offset,
      take: pageable.limit,
    });

    const responses = lista.map((a) => new AlunoResponse(a));

    return Page.of(responses, totalElements, pageable);
  }
}
