export class UsuarioResponse {
  idUsuario!: number;
  firstName!: string;
  lastName!: string;
  username!: string;
  email!: string;

  constructor(data: Partial<UsuarioResponse> = {}) {
    Object.assign(this, data);
  }
}
