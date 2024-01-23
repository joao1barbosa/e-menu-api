// function to handle with incomum errors

export const errorHandler = (error) => {
  console.log(error);

  if (error.code === 'P2002') {
    if (error.meta.target[0] === 'email')
      return 'O email já está sendo utilizado.';

    if (error.meta.target[0] === 'name')
      return 'O nome do restaurante já está sendo utilizado';

    if (error.meta.target[0] === 'userId')
      return 'Usuário já possui um restaurante';
  }

  if (error.code === 'P2003') {
    if (error.meta.field_name === 'Restaurant_userId_fkey (index)')
      return 'Usuário referenciado não existe';
  }

  if (error.code === 'P2025')
    return 'Id não encontrado';

  if (error.code === 'invalid_string')
    return error.message;

  if ((error.code === 'too_small') || (error.code === 'too_big'))
    return error.message;

  return 'Erro não comum';
};
