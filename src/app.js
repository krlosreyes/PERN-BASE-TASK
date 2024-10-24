// Importa el módulo 'express', que es un framework para crear aplicaciones web en Node.js.
import express from 'express';
// Importa el middleware 'morgan', que se usa para registrar (log) solicitudes HTTP en la consola.
import morgan from 'morgan';
import taskRoutes from './routes/task.routes.js'
import authRoutes from './routes/auth.routes.js'

// Crea una instancia de la aplicación de Express. Esta instancia es una función que representa la app.
const app = express();

// Usa el middleware 'morgan' en el modo 'dev' para registrar solicitudes HTTP en formato simplificado en la consola.
app.use(morgan('dev'));

// Middleware que permite a la aplicación recibir datos en formato JSON en las solicitudes.
app.use(express.json());

// Middleware que permite manejar datos enviados desde formularios HTML (formato URL-encoded).
app.use(express.urlencoded({ extended: false }));

// Define una ruta GET para la raíz ('/') que envía una respuesta JSON con un mensaje de bienvenida.
app.get("/", (req, res) => res.json({ message: "Welcome" }));
app.use("/api", taskRoutes);
app.use("/api", authRoutes);

// Middleware de manejo de errores que captura errores y envía una respuesta JSON con el código de estado 500.
app.use((err, req, res, next) => {
    res.status(500).json({
        status: "error",
        message: err.message
    });
});

// Exporta la instancia de la aplicación de Express para que pueda ser utilizada en otros archivos.
export default app;

