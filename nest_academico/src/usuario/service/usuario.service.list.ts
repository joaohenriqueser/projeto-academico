import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    const query = this.usuarioRepository
      .createQueryBuilder(USUARIO.ALIAS)
      .orderBy(`${USUARIO.ALIAS}.${props}`, order)
      .offset(pageable.offset)
      .limit(pageable.limit);

    if (search) {
      query.where(`${USUARIO.ALIAS}.${props} LIKE :search_where`, {
        search_where: `%${search}%`,
      });
    }

    const [listaUsuarios, totalElements] = await query.getManyAndCount();

    const usuariosResponse = listaUsuarios.map(
      (usuario) =>
        new UsuarioResponse({
          idUsuario: usuario.idUsuario,
          firstName: usuario.firstName,
          lastName: usuario.lastName,
          username: usuario.username,
          email: usuario.email,
        }),
    );

    return Page.of(usuariosResponse, totalElements, pageable);
  }
}
