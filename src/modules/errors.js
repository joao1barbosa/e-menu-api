export const errorHandler = (error) => {
  // console.log(error);

  if (error.code === 'P2002') {
    if (error.meta.target[0] === 'email')
      return 'O email já está sendo utilizado.';

    if (error.meta.target[0] === 'restaurantName')
      return 'O nome do restaurante já está sendo utilizado';
  }

  if (error.code === 'P2025')
    return 'Usuário não encontrado';

  if (error.code === 'invalid_string')
    return error.message;

  if ((error.code === 'too_small') || (error.code === 'too_big'))
    return error.message;

  return 'Erro não comum';
};
