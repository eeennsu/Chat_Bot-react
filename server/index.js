const express = require('express');
const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));                    // application/x-www-form-urlencoded를 분석해서 가져와준다
app.use(bodyParser.json());                                            // json타입으로 된 것을 분석해서 가져올 수 있게 해준다
app.use('/server', express.static('server'));

app.use('/api/dialogflow', require('./routes/dialogflow'));

app.listen(PORT, () => {
    console.log(`Server is connected at ${PORT} port!!`);
});