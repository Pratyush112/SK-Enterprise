import Part from "../models/part.model.js";

export const getAllParts = async (req, res) => {
    try {
        const parts = await Part.find();
        res.status(200).json(parts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

