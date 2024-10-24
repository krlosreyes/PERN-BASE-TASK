// Importa la aplicación de Express desde el archivo 'app.js'.
import app from './app.js';

// Inicia el servidor de la aplicación y hace que escuche en el puerto 3000.
app.listen(3000);

// Muestra un mensaje en la consola indicando que el servidor está corriendo en el puerto 3000.
console.log("Server on port", 3000);
