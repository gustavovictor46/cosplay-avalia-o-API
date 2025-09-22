import dados from "../models/dados.js";
const { cosplays } = dados;

const getAllCosplays = (req, res) => {
    const {personagem, anime, cosplayer, evento, data,custo, avaliacao, fotos} = req.query;

    let resultado = cosplays;

    res.status(200).json({
        total: resultado.length,
        cosplays: resultado
    });


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

    

    

}


 export { getAllCosplays };