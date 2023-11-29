const express = require('express');
const config = require('./config/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const YAML = require('yaml');
const connectDB = require('./config/db');
const routes = require('./routes/main');

const app = express();
const port = config.PORT;
const DATABASE_URL = config.MONGOOSE.url;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// CORS Policy
app.use(cors());

// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json());

// Load Routes
app.use(routes);

// swagger
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const file = fs.readFileSync('./swagger/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
