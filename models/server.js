const express = require('express');
const cors = require("cors");

const app = express();

class Server {

    constructor() {
      this.app = express();
      this.port = process.env.PORT;
      this.usuariosPath = "/api/usuarios";

      //Lectura y parseo del body
      this.app.use( express.json() );

      // Middlewares
      this.middlewares();

      //Rutas de mi aplicacion
      this.routes();
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