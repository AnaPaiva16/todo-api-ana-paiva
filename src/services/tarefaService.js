// SERVICE: a logica de Tarefa e o SQL que vai para o banco.

const { db } = require("../config/db");

// Os unicos valores aceitos (use na validacao):
const PRIORIDADES = ["baixa", "media", "alta"];
const STATUS = ["a_fazer", "fazendo", "feita"];

// H01 - Lista como tarefas + Bônus B1 (Filtros)
async function listarTarefas(filtros) {
  const [linhas] = await db.query("SELECT tarefas.*, categorias.nome AS categoria FROM tarefas LEFT JOIN categorias ON tarefas.categoria_id = tarefas.id",);
  let resultado = linhas;

  if (filtros.status) {
    resultado = resultado.filter((tarefa) => tarefa.status === filtros.status);
  }
  if (filtros.prioridade) {
    resultado = resultado.filter(
      (tarefa) => tarefa.prioridade === filtros.prioridade
    );
  }

  return resultado;
}

// H02 - Buscar tarefa por ID
async function buscarTarefaPorId(id) {
  const [linhas] = await db.query("SELECT tarefas.*, categorias.nome AS categoria FROM tarefas LEFT JOIN categorias ON tarefas.categoria_id = categorias.id WHERE tarefas.id = ?",);
  return linhas[0];
}

// H03 - Cadastrar tarefa
async function criarTarefa(dados) {
  const [resultado] = await db.query(
    "INSERT INTO tarefas (titulo, prioridade, status) VALUES (?, ?, ?, ?)",
    [dados.titulo, dados.prioridade, dados.status, dados.nome]
  );
  return await buscarTarefaPorId(resultado.insertId);
}

// H04 - Alterar tarefa completa (PUT)
async function atualizarTarefa(id, dados) {
  const [resultado] = await db.query(
    "UPDATE tarefas SET titulo = ?, prioridade = ?, status = ?, categoria_id = ? WHERE id = ?",
    [dados.titulo, dados.prioridade, dados.status, dados.categoria_id, dados.nome]
  );
  if (resultado.affectedRows === 0) return null;
  return await buscarTarefaPorId(id);
}

// H04 - Alterar tarefa parcialmente (PATCH)
async function atualizarParcialTarefa(id, dados) {
  const tarefa = await buscarTarefaPorId(id);
  if (!tarefa) return null;

  if (dados.titulo !== undefined) tarefa.titulo = dados.titulo;
  if (dados.prioridade !== undefined) tarefa.prioridade = dados.prioridade;
  if (dados.status !== undefined) tarefa.status = dados.status;
  if (dados.categoria_id !== undefined) tarefa.categoria_id = dados.categoria_id;

  return await atualizarTarefa(id, tarefa);
}

// H05 - Apagar uma tarefa (DELETE)
async function deletarTarefa(id) {
  const [resultado] = await db.query("DELETE FROM tarefas WHERE id = ?", [id]);
  return resultado.affectedRows > 0;
}

// H06 - Validação dos dados
function validarTarefa(dados, completo) {
  if (!dados) return "Envie os dados da tarefa em JSON";
  if (completo && !dados.titulo) return "O titulo e obrigatorio";
  if (completo && !dados.prioridade) return "A prioridade e obrigatoria";
  if (completo && !dados.status) return "O status e obrigatorio";

  if (
    dados.prioridade !== undefined &&
    !PRIORIDADES.includes(dados.prioridade)
  ) {
    return "A prioridade deve ser baixa, media ou alta";
  }

  if (dados.status !== undefined && !STATUS.includes(dados.status)) {
    return "O status deve ser a_fazer, fazendo ou feita";
  }

  return null;
}

module.exports = { 
  listarTarefas,
  buscarTarefaPorId,
  criarTarefa,
  atualizarTarefa,
  atualizarParcialTarefa,
  deletarTarefa,
  validarTarefa,
 };
