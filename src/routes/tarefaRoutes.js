// ROTA: recebe a requisicao HTTP e chama o controller.

const express = require("express");
const tarefaController = require("../controllers/tarefaController");
const validarId = require("../middlewares/validarId");

const router = express.Router();

// H01
router.get("/", tarefaController.listar);
// H02
router.get("/:id", validarId, tarefaController.buscarPorId);

module.exports = router;
