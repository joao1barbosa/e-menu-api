export const errorHandler = (error) => {
  console.log(error.code);

  if (error.code === 'P2002') {
    if (error.meta.target[0] === 'email') {
      return 'O email já está sendo utilizado.';
    }
  }

  if (error.code === 'invalid_string') {
    console.log(error.path);
    if (error.path[1] === 'email') {
      return 'Email inválido';
    }
  }

  return '';
};
