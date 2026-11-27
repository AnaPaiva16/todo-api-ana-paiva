// ROTA: recebe a requisicao HTTP e chama o controller.

const express = require("express");
const tarefaController = require("../controllers/tarefaController");
const validarId = require("../middlewares/validarId");

const router = express.Router();

// H01 - Lista como tarefas
router.get("/", tarefaController.listar);
// H02 - Buscar tarefa por ID
router.get("/:id", validarId, tarefaController.buscarPorId);
// H03 - Cadastrar tarefa
router.post("/", tarefaController.criar);

module.exports = router;
