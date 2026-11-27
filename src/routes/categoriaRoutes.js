// ROTA: recebe a requisicao HTTP e chama o controller.

const express = require("express");
const categoriaController = require("../controllers/categoriaController");
const validarId = require("../middlewares/validarId");

const router = express.Router();

// H01 - Lista como categorias
router.get("/", categoriaController.listar);
// H02 - Buscar categoria por ID
router.get("/:id", validarId, categoriaController.buscarPorId);
// H03 - Cadastrar tarefa
router.post("/", categoriaController.criar);
// H04 - Apagar uma tarefa (DELETE)
router.delete("/:id", validarId, categoriaController.deletar);

module.exports = router;
