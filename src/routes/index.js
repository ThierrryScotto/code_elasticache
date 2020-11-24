'use strict'

// dependencies
require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const port = process.env.PORT || 3000;

class AppController {
  constructor() {
		this.express = express();
		this.router  = express.Router();
		this.middlewares();
		this.connection();
	}

	middlewares() {
		this.express.use(bodyParser.json());
		this.express.use(express.json());
		this.express.use(helmet());
		this.express.use(cors());
	}

	connection() {
		this.express.listen(port, (error, sucess) => {
			if (error) console.log(error);

			console.log(`listening at the port ${port}`);
		})
	}
}

module.exports = new AppController();