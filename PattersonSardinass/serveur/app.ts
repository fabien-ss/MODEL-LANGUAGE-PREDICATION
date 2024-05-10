const { isCode, handleApiRequest } = require ("./src/PattersonSardinass.ts");
const { ask_python } = require ("./src/ML.ts");

import { Request, Response } from "express";

const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173',//(https://your-client-app.com)
  optionsSuccessStatus: 200,
};

const express = require('express');
const serveIndex = require('serve-index');

const app = express();

app.use(cors(corsOptions));

app.get('/is_code/:code', async (req: Request, res: Response) => {
  const ml = await ask_python(req.params.code)
  const ps = handleApiRequest(req.params.code)
  const retour = {
    "python": ml,
    "ps": ps
  } 
  res.send((retour));
})

app.listen(3000, () => console.log('Example app is listening on port 3000.'));