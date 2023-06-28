"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class AlunoController {
  async index(req, res) {
    try {
      const aluno = await _Aluno2.default.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename'],
        },
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['Nenhum aluno foi encontrado'],
        });
      }

      res.json(aluno);
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.messege),
      });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);
      const aluno = await _Aluno2.default.create(req.body);

      res.json(aluno);
    } catch (e) {
      console.log(e);
      res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando Id'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename'],
        },
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      res.json(aluno);
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.messege),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando Id'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
      await aluno.destroy();

      res.json({
        apagado: true,
      });
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.messege),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando Id'],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
      const alunoAtualizado = await aluno.update(req.body);

      res.json(alunoAtualizado);
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.messege),
      });
    }
  }
}

exports. default = new AlunoController();
