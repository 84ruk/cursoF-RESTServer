const express = require('express');
const cors = require("cors");
const { dbConection } = require('../database/config');

const app = express();

class Server {

    constructor() {
      this.app = express();
      this.port = process.env.PORT;
      this.usuariosPath = "/api/usuarios";

      //Conectar a base de datos
      this.conectarDB();

      //Lectura y parseo del body
      this.app.use( express.json() );

      // Middlewares
      this.middlewares();

      //Rutas de mi aplicacion
      this.routes();
    }

    async conectarDB() {
      await dbConection();
    }

    middlewares(){

      //Cors
      this.app.use(cors());

      //Directorio pblico
      this.app.use( express.static('public') );

    }

    routes(){

      this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }


    

    listen(){
        this.app.listen(this.port, () => {
          console.log(`Example app listening at http://localhost:${this.port}`);
        });
    }

}



module.exports = Server;