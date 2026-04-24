import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { Pageable } from '../../commons/pagination/page.response';
import { Page } from '../../commons/pagination/page.sistema';
import { USUARIO, fieldsUsuario } from '../constants/usuario.constants';

@Injectable()
export class UsuarioServiceList {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async list(
    page: number,
    pageSize: number,
    props: string,
    order: 'ASC' | 'DESC',
    search?: string,
  ): Promise<Page<UsuarioResponse>> {
    const pageable = new Pageable(page, pageSize, props, order, fieldsUsuario);

    const [lista, totalElements] = await this.usuarioRepository.findAndCount({
      where: search ? { username: Like(`%${search}%`) } : {},
      order: { [pageable.props]: order } as any,
      skip: pageable.offset,
      take: pageable.limit,
    });

    const responses = lista.map((u) => new UsuarioResponse(u));

    return Page.of(responses, totalElements, pageable);
  }
}
