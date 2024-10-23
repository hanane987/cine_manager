import Film from '../models/Film.js';
import Utilisateur from '../models/Utilisateur.js';

export const getStatistics = async (req, res) => {
    try {
        const totalFilms = await Film.countDocuments();
        const totalUsers = await Utilisateur.countDocuments();

        res.json({
            totalFilms,
            totalUsers
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
