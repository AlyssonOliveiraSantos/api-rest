import Aluno from '../models/Aluno';

class AlunoController {
  async index(req, res) {
    try {
      const aluno = await Aluno.findAll();

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
      const aluno = await Aluno.create(req.body);

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

      const aluno = await Aluno.findByPk(id);

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

      const aluno = await Aluno.findByPk(id);

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

      const aluno = await Aluno.findByPk(id);

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

export default new AlunoController();
