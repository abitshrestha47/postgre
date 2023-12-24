import {Pool,PoolConfig} from 'pg';


const poolConfig:PoolConfig=({
    user:'postgres',
    password:process.env.password,
    host:'localhost',
    port:5432,
    database:process.env.database
});

const pool=new Pool(poolConfig);

export default pool;