import dados from "../models/dados.js";
const { cosplays } = dados;

const getAllCosplays = (req, res) => {
    const {personagem, anime, cosplayer, evento, data,custo, avaliacao, fotos} = req.query;

    let resultado = cosplays;

    res.status(200).json({
        total: resultado.length,
        cosplays: resultado
    });


    const personagemCosplay = ["Monkey D. Luffy", "Levi Ackerman", "Sailor Moon", "Goku Super Saiyajin", "Sakura Kinomoto", "Naruto Uzumaki", "Kenshin Himura", "Eren Yeager", "Gojo Satoru", "Inosuke Hashibira"];

    const animeCosplay = ["One Piece", "Attack on Titan", "Sailor Moon", "Dragon Ball Z", "Cardcaptor Sakura", "Naruto Shippuden", "Samurai X", "Attack on Titan", "Jujutsu Kaisen", "Demon Slayer"];

    const eventoCosplay = ["Anime Friends 2024", "Comic Con Experience 2023", "Geek City 2022", "Ressaca Friends 2024", "Anime Summit 2023", "BGS 2023", "Anime Friends 2023", "Geek City 2023", "Anime XP 2024", "Anime Friends 2024"];

    const custoCosplay = ["R$ 550.00", "R$ 800.00", "R$ 420.00", "R$ 650.00", "R$ 380.00", "R$ 500.00", "R$ 720.00", "R$ 780.00", "R$ 900.00", "R$ 680.00"];




    //Filtros
      if (personagem) {
        resultado = personagem.filter((p) => p.personagem.toLowerCase() === personagem.toLowerCase())
      }
    
      if (anime) {
        resultado = anime.filter((a) => a.anime.toLowerCase() === anime.toLowerCase())
      }

      if(evento) {
        resultado = evento.filter((e) => e.evento.toLowerCase() === evento.toLowerCase())
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
    
          if (custo = 0 && custo < 0) {
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
        if (custo < 0 || custo === 0 ) {
            return res.status(404).json({
                success:false,
                message: "O custo não pode ser 0 reais e nem negativo",
            });
        }

        //Data deve ser uma data válida e não pode ser futura



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