import express from 'express';
import dotenv from 'dotenv';
import OpenAIAPI  from 'openai'; 

dotenv.config();

const router = express.Router();

const openai = new OpenAIAPI({
  key: process.env.OPEN_API_KEY,
});

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Nothing comes easy' }); 
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
       
      prompt,
      n: 1,
      size: "1024x1024",
    });

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(500).json({
      success: false,
      error: "The image could not be generated",
    });
  }
});

export default router;
