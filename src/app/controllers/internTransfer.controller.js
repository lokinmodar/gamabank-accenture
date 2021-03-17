import internTransferDto from '../models/dto/internTransfer.dto'

class InternTransferController {
    async store(req, res) {
        const schema = internTransferDto;

        try {
            await schema.validate(req.body); // chamada ao yup.validate pra validação do DTO(schema)
          } catch (error) {
            // extraindo de dentro do retorno do Yup o erro exato
            return res.status(400).json({ error_1: error.errors[0] });
          }

          return res.json({ok: 'Deu tudo certo.'})

    }
}

export default new InternTransferController();