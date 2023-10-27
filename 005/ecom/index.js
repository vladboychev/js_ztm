const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const crypto = require("crypto");

const usersRepo = require("./repositories/users");

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: [crypto.randomUUID()],
  })
);

app.get("/signup", (req, res) => {
  res.send(`
    <div>
    Your id is: ${req.session.userId}
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="passwordConfirm" placeholder="password confirmation" />
            <button>Sign Up</button>
        </form>
    </div>
  `);
});

app.post("/signup", async (req, res) => {
  const { email, password, passwordConfirm } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });

  if (existingUser) {
    return res.send("Email in use.");
  }

  if (password !== passwordConfirm) {
    return res.send("Passwords must match.");
  }

  const user = await usersRepo.create({ email, password });

  req.session.userId = user.id;

  res.send("Account created!!!");
});

app.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out..");
});

app.get("/signin", (req, res) => {
  res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <button>Sign In</button>
        </form>
    </div>
  `);
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send("Wrong credentials..");
  }

  if (password !== user.password) {
    return res.send("Wrong credentials..");
  }

  req.session.userId = user.id;

  res.send("You are signed in..");
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});
