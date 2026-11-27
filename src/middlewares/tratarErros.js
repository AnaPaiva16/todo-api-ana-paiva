// Recebe qualquer erro que aconteceu numa rota e escolhe o status certo.
// O codigo do erro aparece no terminal: e por ele que o "if" decide.

function tratarErros(err, req, res, next) {
  console.log("ERRO:", err.code, err.message);

  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    res.status(____).json({ erro: "A categoria informada nao existe" });
    return;
  }
  if (err.code === "ER_ROW_IS_REFERENCED_2") {
    res
      .status(____)
      .json({ erro: "A categoria tem tarefas e nao pode ser apagada" });
    return;
  }

  res.status(500).json({ erro: "Erro interno no servidor" });
}

module.exports = tratarErros;
