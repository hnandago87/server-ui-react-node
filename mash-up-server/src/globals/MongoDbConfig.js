import mongoose from 'mongoose';
import {mongoURL} from './DbConfig';
mongoose.Promise = global.Promise;
const mongooseConnection = mongoose.connect(mongoURL);
export default {mongooseConnection};


//Madan and Hari password --> Gerrard_08 and hash is "$2a$10$NhmWT1PIfewk5fW0IugBR.cZLtfBBffIH3bt9foteoCTaHGF3XreK"
// JWT secret key -->MashUpJWTSuperSecretKey_Created@_Dec,26^th,2017. and hash is "$2a$10$0mSSOdLdjtdZjh4hCYGxCe2hSlyvM95JvJ3Cj7W.JEy9NmjUO9RXq"