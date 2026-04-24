const ENTITY_NAME = "Usuário";

export const USUARIO = {
  ENTITY: ENTITY_NAME,
  ALIAS: "usuario",
  FIELDS: {
    ID: "idUsuario",
    USERNAME: "username",
    FIRSTNAME: "firstName",
    LASTNAME: "lastName",
    EMAIL: "email",
  } as const,
  LABEL: {
    USERNAME: "Usuário",
    NOME: "Nome",
  },
  TITULO: {
    LISTA: `Lista de ${ENTITY_NAME}`,
    CRIAR: `Novo ${ENTITY_NAME}`,
    ATUALIZAR: `Atualizar ${ENTITY_NAME}`,
    EXCLUIR: `Excluir ${ENTITY_NAME}`,
    CONSULTAR: `Consultar ${ENTITY_NAME}`,
  },
};
