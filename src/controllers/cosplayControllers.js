import dados from "../models/dados.js";
const { cosplays } = dados;

const getAllCosplays = (req, res) => {
    const {personagem, anime, cosplayer, evento, data,custo, avaliacao, fotos} = req.query;

    let resultado = cosplays;

    res.status(200).json({
        total: resultado.length,
        cosplays: resultado
    });


    const getCosplayById= (req, res) => {
        const id = parseInt(req.params.id);

        const cosplay = cosplays.find(c => c.id ===id);

        if(!cosplay){
           return res.status(404).json({
                success: false, 
                message: "Esse cosplay não existe"
            });
        };

        return res.status(200).json({
            total:cosplay.length,
            cosplays: cosplay
        });
    };

    const createCosplay = (req, res) => {
         const {personagem, anime, cosplayer, evento, data, custo, avaliacao, fotos} = req.body;
    
          if (!personagem) {
            return res.status(400).json({
                success: false,
                message: "O campo 'personagem' é obrigatório"
            });
         }
    
          if (!anime) {
            return res.status(400).json({
                success: false,
                message: "O campo 'anime' é obrigatório"
            });
        }
    
          if (!cosplayer) {
            return res.status(400).json({
                success: false,
                message: "O campo 'cosplayer' é obrigatório"
            });
         }
    
          if (!evento) {
            return res.status(400).json({
                success: false,
                message: "O campo 'evento' é obrigatório"
            });
         }
    
          if (!data) {
            return res.status(400).json({
                success: false,
                message: "O campo 'data' é obrigatório"
            });
         }
    
          if (!custo) {
            return res.status(400).json({
                success: false,
                message: "O campo 'custo' é obrigatório"
            });
         }
          if (!avaliacao) {
            return res.status(400).json({
                success: false,
                message: "O campo 'custo' é obrigatório"
            });
         }
          if (!fotos) {
            return res.status(400).json({
                success: false,
                message: "O campo 'custo' é obrigatório"
            });
        }
        
        //Regra de negócios

        if (custo = 0 || custo < 0) {
            return res.status(404).json({
                success:false,
                message: "O custo não pode ser 0 reais e nem negativo",
            });
        }


        const novoCosplay = {
            id:cosplays.length +1,
            personagem,
            anime,
            cosplayer,
            evento,
            data: new Date,
            custo: parseInt(custo),
            avaliacao: parseInt(avaliacao),
            fotos
        }

        cosplays.push(novoCosplay)

        return res.status(200).json({
            success: true,
            message: "Cosplay cadastrado com sucesso",
            cosplay: novoCosplay
        });
    };














































     

    

    




 export { getAllCosplays, getCosplayById, createCosplay  };