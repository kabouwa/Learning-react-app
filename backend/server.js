const 
express = require('express'),
cors = require('cors'),
config = require('./config/config'),
authRoues = require('./routes/auth');

const app = express();
const port = config('SERVER_PORT');

app.use(cors({
    origin: `${ config('FRONT_HOST') }:${ config('FRONT_PORT') }` 
}))
app.use(express.json());
app.use('/learning-app/api', authRoues);

const server = app.listen(port, () => {
    console.log(`Server runned succesffully on : http://localhost:${port}/learning-app/api`);
});

server.on("error", (error) => {
    console.error("Server error:", error);
});