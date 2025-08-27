import pg from "pg";
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Solo POST" });
  const { compania } = req.body;
  if (!compania) return res.status(400).json({ error: "Falta compañía" });

  try {
    await pool.query("INSERT INTO companias(nombre) VALUES($1) ON CONFLICT DO NOTHING", [compania]);
    res.status(200).json({ message: "Compañía agregada", compania });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
