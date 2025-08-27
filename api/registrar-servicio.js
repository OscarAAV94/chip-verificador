import pg from "pg";
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Solo POST" });
  const { servicio } = req.body;
  if (!servicio) return res.status(400).json({ error: "Falta servicio" });

  try {
    await pool.query("INSERT INTO servicios(nombre) VALUES($1) ON CONFLICT DO NOTHING", [servicio]);
    res.status(200).json({ message: "Servicio agregado", servicio });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
