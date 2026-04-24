import { Usuario } from '../../entities/usuario.entity';
import { Link } from '../../../commons/mensagem/mensagem';

export class UsuarioResponse {
  idUsuario?: number;
  codUsuario: string;
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
  _links?: Record<string, Link>;

  constructor(usuario: Usuario) {
    this.idUsuario = usuario.idUsuario;
    this.codUsuario = usuario.codUsuario;
    this.firstName = usuario.firstName;
    this.lastName = usuario.lastName;
    this.username = usuario.username;
    this.email = usuario.email;
  }
}
