// CONTROLLER: recebe da rota, chama o service e devolve a resposta.

const tarefaService = require("../services/tarefaService");

// H01 - Lista como tarefas
async function listar(req, res) {
  const tarefas = await tarefaService.listarTarefas(req.query);
  res.status(200).json(tarefas);
}

// H02 - Buscar tarefa por ID
async function buscarPorId(req, res) {
  const tarefa = await tarefaService.buscarTarefaPorId(req.params.id);
  if (!tarefa) {
    res.status(404).json({ erro: "Tarefa nao encontrada" });
    return;
  }
  res.status(200).json(tarefa);
}

// H03 - Cadastrar uma tarefa + H06 - Validação com dados
async function criar(req, res) {
  const erro = tarefaService.validarTarefa(req.body, true);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const novaTarefa = await tarefaService.criarTarefa(req.body);
  res.status(201).json(novaTarefa);
}

 
// H04 - Alterar tarefa completa (PUT) + H06 - Validação com dados
async function atualizar(req, res) {
  const erro = tarefaService.validarTarefa(req.body, true);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const tarefaAtualizada = await tarefaService.atualizarTarefa(
    req.params.id,
    req.body
  );
  if (!tarefaAtualizada) {
    res.status(404).json({ erro: "Tarefa nao encontrada" });
    return;
  }
  res.status(200).json(tarefaAtualizada);
}

// H04 - Alterar tarefa parcialmente (PATCH) + H06 - Validação com dados
async function atualizarParcial(req, res) {
  const erro = tarefaService.validarTarefa(req.body, false);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const tarefaAtualizada = await tarefaService.atualizarParcialTarefa(
    req.params.id,
    req.body
  );
  if (!tarefaAtualizada) {
    res.status(404).json({ erro: "Tarefa nao encontrada" });
    return;
  }
  res.status(200).json(tarefaAtualizada);
}

// H05 — Apagar uma tarefa (DELETE)
async function deletar(req, res) {
  const apagou = await tarefaService.deletarTarefa(req.params.id);
  if (!apagou) {
    res.status(404).json({ erro: "Tarefa nao encontrada" });
    return;
  }
  res.status(204).send();
}

module.exports = { 
  listar,
  buscarPorId,
  criar,
  atualizar,
  atualizarParcial,
  deletar,
 };