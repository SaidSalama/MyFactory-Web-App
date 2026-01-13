import mysql ,{type  PoolConnection } from "mysql2/promise";

class MySQLService{
    //connection function to my sql service
    public connect =async () => {
         
        //if there  is not any connection create a connection
        if (!MySQLService.instance) {
            MySQLService.instance = await  mysql.createPool({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                namedPlaceholders: true,
            }).getConnection();
        }
        return MySQLService.instance;
    }
    //static property
    public static instance: PoolConnection;
}
export default MySQLService;