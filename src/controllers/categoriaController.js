// CONTROLLER: recebe da rota, chama o service e devolve a resposta.

const categoriaService = require("../services/categoriaService");

// H01 - Lista como categorias
async function listar(req, res) {
  const categorias = await categoriaService.listarCategorias(req.query);
  res.status(200).json(categorias);
}

// H02 - Buscar categoria por ID
async function buscarPorId(req, res) {
  const categoria = await categoriaService.buscarCategoriaPorId(req.params.id);
  if (!categoria) {
    res.status(404).json({ erro: "Categoria nao encontrada" });
    return;
  }
  res.status(200).json(categoria);
}

// H03 - Cadastrar uma categoria + H06 - Validação com dados
async function criar(req, res) {
  const erro = categoriaService.validarCategoria(req.body, true);
  if (erro) {
    res.status(400).json({ erro: erro });
    return;
  }
  const novaCategoria = await categoriaService.criarCategoria(req.body);
  res.status(201).json(novaCategoria);
}

// H04 — Apagar uma categoria (DELETE)
async function deletar(req, res) {
  const apagou = await categoriaService.deletarCategorias(req.params.id);
  if (!apagou) {
    res.status(404).json({ erro: "Categoria nao encontrada" });
    return;
  }
  res.status(204).send();
}

module.exports = { 
  listar,
  buscarPorId,
  criar,
  deletar,
 };
 