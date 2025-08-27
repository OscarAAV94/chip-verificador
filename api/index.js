import pg from "pg";
const { Pool } = pg;

// Conexión a Supabase usando variable de entorno
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Función que Vercel ejecuta como API
export default async function handler(req, res) {
  try {
    // Probar conexión a la base de datos
    const result = await pool.query("SELECT NOW()");
    
    // Retornar mensaje de éxito y hora actual
    res.status(200).json({
      message: "Conectado a la BD correctamente",
      time: result.rows[0]
    });
  } catch (err) {
    // En caso de error
    res.status(500).json({
      message: "Error al conectar a la BD",
      error: err.message
    });
  }
}
