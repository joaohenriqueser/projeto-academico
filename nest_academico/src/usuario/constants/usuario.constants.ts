import { criarMensagemOperacao } from '../../commons/constants/constants.entity';

const ENTITY_NAME = 'Usuário';

const MAX_LEN_STRING = 50;
const MIN_LEN_STRING = 3;

const MAX_LEN_EMAIL = 100;

const MAX_LEN_SENHA = 100;
const MIN_LEN_SENHA = 6;

export const USUARIO = {
  ENTITY: ENTITY_NAME,

  TABLE: 'USUARIO',

  TABLE_FIELD: {
    ID_USUARIO: 'ID_USUARIO',
    COD_USUARIO: 'COD_USUARIO',
    NOME_USUARIO: 'NOME_USUARIO',
    EMAIL: 'EMAIL',
    SENHA: 'SENHA',
    TIPO: 'TIPO',
    ID_CIDADE: 'ID_CIDADE',
    ATIVO: 'ATIVO',
  },

  ALIAS: 'Usuario',

  FIELDS: {
    ID_USUARIO: 'idUsuario',
    COD_USUARIO: 'codUsuario',
    NOME_USUARIO: 'nomeUsuario',
    EMAIL: 'email',
    SENHA: 'senha',
    TIPO: 'tipo',
    ID_CIDADE: 'idCidade',
    ATIVO: 'ativo',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    USERNAME: 'username',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
  },

  SWAGGER: {
    ID_USUARIO: `Código de identificador único do ${ENTITY_NAME}`,
    COD_USUARIO: `Código do ${ENTITY_NAME} cadastrado`,
    NOME_USUARIO: `Nome completo do ${ENTITY_NAME} cadastrado`,
    EMAIL: `Endereço de e-mail do ${ENTITY_NAME}`,
    SENHA: `Senha de acesso do ${ENTITY_NAME}`,
    TIPO: `Nível de acesso do ${ENTITY_NAME} (1 = Professor, 2 = Aluno)`,
    ID_CIDADE: `Identificador da cidade do ${ENTITY_NAME}`,
    ATIVO: `Status de ativação do ${ENTITY_NAME}`,
  },

  INPUT_ERROR: {
    FIRST_NAME: {
      BLANK: `O primeiro nome do ${ENTITY_NAME} deve ser informado`,
      MAX_LEN: `O primeiro nome do ${ENTITY_NAME} deve ter no máximo ${MAX_LEN_STRING} caracteres`,
      MIN_LEN: `O primeiro nome do ${ENTITY_NAME} deve ter no mínimo ${MIN_LEN_STRING} caracteres`,
      STRING: `O primeiro nome do ${ENTITY_NAME} deve ser do tipo texto`,
    },
    LAST_NAME: {
      BLANK: `O sobrenome do ${ENTITY_NAME} deve ser informado`,
      MAX_LEN: `O sobrenome do ${ENTITY_NAME} deve ter no máximo ${MAX_LEN_STRING} caracteres`,
      STRING: `O sobrenome do ${ENTITY_NAME} deve ser do tipo texto`,
    },
    USERNAME: {
      BLANK: `O nome de usuário (username) deve ser informado`,
      STRING: `O nome de usuário deve ser do tipo texto`,
    },
    EMAIL: {
      BLANK: `O e-mail do ${ENTITY_NAME} deve ser informado`,
      VALID: `O formato do e-mail informado é inválido`,
      MAX_LEN: `O e-mail do ${ENTITY_NAME} deve ter no máximo ${MAX_LEN_EMAIL} caracteres`,
    },
    PASSWORD: {
      BLANK: `A senha do ${ENTITY_NAME} deve ser informada`,
      MIN_LEN: `A senha do ${ENTITY_NAME} deve ter no mínimo ${MIN_LEN_SENHA} caracteres`,
      MAX_LEN: `A senha do ${ENTITY_NAME} deve ter no máximo ${MAX_LEN_SENHA} caracteres`,
    },
    CONFIRM_PASSWORD: {
      BLANK: `A confirmação de senha deve ser informada`,
      MATCH: `A confirmação de senha não confere com a senha digitada`,
    },
  },

  OPERACAO: criarMensagemOperacao(ENTITY_NAME),
};

export const fieldsUsuario = Object.values(USUARIO.FIELDS);
