import { connect, connection } from 'mongoose';

const connection_string = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';

connect(connection_string);

export default connection;
