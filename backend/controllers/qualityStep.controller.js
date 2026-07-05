import QualityStep from '../models/qualityStep.model.js';

/**
 * GET /quality-steps
 * Retrieves all quality assurance steps ordered sequentially.
 */
export const getQualitySteps = async (req, res) => {
  try {
    const steps = await QualityStep.find({ isActive: { $ne: false } }).sort({ displayOrder: 1, order: 1 });
    res.status(200).json(steps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quality steps', error: err.message });
  }
};
