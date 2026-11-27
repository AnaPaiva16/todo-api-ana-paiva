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

// H03 - Cadastrar uma tarefa
async function criar(req, res) {
  const novaTarefa = await tarefaService.criarTarefa(req.body);
  res.status(201).json(novaTarefa);
}
module.exports = { 
  listar,
  buscarPorId,
  criar,
 };
