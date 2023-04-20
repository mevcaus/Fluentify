const path = require('path');
const express = require('express');
const router = require('./router');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(router);
app.listen(process.env.PORT, () => {
  console.log(`sucessfully listening on port ${process.env.PORT}`);
});
