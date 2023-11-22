import { reportModel } from "../models/index.js";

export const getAllTopics = async (req, res) => {
    try {
        const allTopics = await reportModel.distinct("topic");
        if (!allTopics || allTopics.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Topics Found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "All Topics",
            data: allTopics,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getCountries = async (req, res) => {
    try {
        const allCountries = await reportModel.distinct("country");
        if (!allCountries || allCountries.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Country Found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "All Countries",
            data: allCountries,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
export const getAllRelevances = async (req, res) => {
    try {
      // Assuming your model has a method to fetch all relevances
      const relevances = await reportModel.distinct("relevance");
  
      // Send the relevances as a JSON response
      res.json({ data: relevances });
    } catch (error) {
      console.error('Error fetching relevances:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const getDataByIntensity = async (req, res) => {
    try {
        const allIntensity= await reportModel.distinct("intensity");
        if (!allIntensity || allIntensity.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Intensity",
            });
        }
        return res.status(200).json({
            success: true,
            message: "All Intensity",
            data: allIntensity,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
  
export const getAllLikelihoods = async (req, res) => {
  try {
    const likelihoods = await reportModel.distinct('likelihood');
    res.json({ data: likelihoods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
