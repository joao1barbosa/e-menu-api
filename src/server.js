import app from './app';

const port = 3002;

app.listen(port, () => {
  console.log();
  console.log(`Escutando na porta ${port}`);
  console.log(`http://localhost:${port}`);
});
