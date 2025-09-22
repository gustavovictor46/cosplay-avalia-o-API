import dados from "../models/dados.js";
const { cosplays } = dados;

const getAllCosplays = (req, res) => {
    const {personagem, anime, cosplayer, evento, data ,custo, avaliacao, fotos} = req.query;

    let resultado = cosplays;

    res.status(200).json({
        total: resultado.length,
        cosplays: resultado
    });


    //Filtros
      if (personagem) {
        resultado = personagem.filter((c) => c.personagem.toLowerCase() === personagem.toLowerCase())
      }
    
      if (anime) {
        resultado = anime.filter((c) => c.anime.toLowerCase() === anime.toLowerCase())
      }

      if(evento) {
        resultado = evento.filter((c) => c.evento.toLowerCase() === evento.toLowerCase())
      }

      if(custo) {
        resultado = resultado.filter((c) => c.custo == custo);
      }
 };

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
    
          if (custo < 0) {
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

        //Custo deve ser maior que 0 reais
        if (custo <= 0) {
            return res.status(404).json({
                success:false,
                message: "O custo não pode ser 0 reais e nem negativo",
            });
        }

        //Data deve ser uma data válida e não pode ser futura

        const dataEvento = ["2024-07-21", "2023-12-03", "2022-09-10", "2024-01-28", "2023-08-15", "2023-10-14", "2023-07-23", "2023-09-09", "2024-04-05", "2024-07-22"];

        const datasValidas = data.toLocaleDateString();

        const datasFuturas =  new Date();
        datasFuturas.setDate(datasValidas.getDate() + 1);

        if (datasFuturas > dataEvento || !dataEvento) {
            return res.status(404).json({
                success:false,
                message: "Data inválida",
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
  

    const deleteCosplay = (req, res) => {
        const id = parseInt(req.params.id);
    
        if(isNaN(id)){
            return res.status(404).json({
                success: false,
                message: "O ID deve ser válido"
            });
        }
    
        const cosplayParaRemover = cosplays.find(c => c.id === id);
    
        if(!cosplayParaRemover) {
            return res.status(404).json({
                success: false,
                message: `Cosplay com o id: ${id} não existe`
            });
        }
    
        const cosplaysFiltrados = cosplays.filter(c => c.id !== id);
    
        cosplays.splice(0, cosplays.length, ...cosplaysFiltrados);
    
        return res.status(200).json({
            success: true,
            message: `O Cosplay ${id} foi removido com sucesso`
        });
    };

     
    const updateCosplay = (req, res) => {
        const id = parseInt(req.params.id);
        const { personagem , anime , cosplayer, evento , data , custo , avaliacao , fotos } = req.body;
    
          const idParaEditar = id;
    
        if(isNaN(idParaEditar)){
            return res.status(404).json({
                sucess: false, 
                message: "o ID deve ser um número válido."
            });
        }
     
        const cosplayExiste = cosplays.find(c => c.id === idParaEditar);
        if(!cosplayExiste){
            return res.status(404).json({
                sucess: false,
                message: `O cosplay com o id: ${idParaEditar} não existe.`
            });
        };

        //Regra de negócios

        //Custo deve ser maior que 0 reais
        if (custo <= 0) {
            return res.status(404).json({
                success:false,
                message: "O custo não pode ser 0 reais e nem negativo",
            });
        };

        //Data deve ser uma data válida e não pode ser futura

        const dataEvento = ["2024-07-21", "2023-12-03", "2022-09-10", "2024-01-28", "2023-08-15", "2023-10-14", "2023-07-23", "2023-09-09", "2024-04-05", "2024-07-22"];

        const datasValidas = data.toLocaleDateString();

        const datasFuturas =  new Date();
        datasFuturas.setDate(datasValidas.getDate() + 1);

        if (datasFuturas > dataEvento || !dataEvento) {
            return res.status(404).json({
                success:false,
                message: "Data inválida",
            });
        }
        


        const cosplaysAtualizados = cosplays.map(c => c.id === idParaEditar ? {
            ...c,
            ...(personagem && { personagem }),
            ...(anime && { anime }),
            ...(cosplayer && { cosplayer }),
            ...(evento && { evento }),
            ...(data && new Date(data) >= new Date() && { data }),
            ...(custo && { custo : parseInt (custo) }),
            ...(avaliacao && { avaliacao : parseInt (avaliacao) })
        }
            : c 
        );
    
       cosplays.splice(0, cosplays.length, ...cosplaysAtualizados);
    
       const cosplayEditado = cosplays.find(c => c.id === idParaEditar);
       return res.status(200).json({
          success: true,
          message: "Dados atualizados com sucesso do cosplay",
          cosplay: cosplayEditado
        })
    }
    
    


 export { getAllCosplays, getCosplayById, createCosplay, deleteCosplay, updateCosplay  };