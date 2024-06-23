import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;
const SECRET_KEY = "your_secret_key";

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.post("/generate-token", (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).send("Username is required");
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

app.get("/public", (req, res) => {
  res.send("This is a public route");
});

app.get("/private", verifyToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, authData) => {
    if (err) {
      return res.sendStatus(403);
    }
    res.json({
      message: "This is a private route",
      authData,
    });
  });
});

// Middleware para verificar el token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
