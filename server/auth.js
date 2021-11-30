const jwt = require("jsonwebtoken");
const { User } = require("./models");
const { AuthenticationError } = require("apollo-server-express");

async function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return null;
  }
}

async function getToken(userId) {
  const today = new Date();
  const exp = new Date(today);

  exp.setDate(today.getDate() + 1);

  const payload = {
    id: userId,
    exp: parseInt(exp.getTime() / 1000),
  };

  return jwt.sign(payload, process.env.SECRET_KEY);
}

async function findUserFromToken(token) {
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  const instance = await User.findByPk(payload.id);
  return JSON.parse(JSON.stringify(instance));
}

async function authMiddleware(req, res, next) {
  if (req.pathname === "/login" || req.pathname === "/register") {
    return next();
  }

  const user = await findUserFromToken(req.headers.authorization);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json("You need to login to access this API");
  }
}

const authenticate = (user, admin) => {
  if (!user) throw new AuthenticationError("Please login to access the API!");
  if (admin && !user.isAdmin) throw AuthenticationError("Permission Denied: You are not an admin!");
  return true;
};

const appolloContext = async ({ req, connection }) => {
  let tokenString = "";
  let user = null;

  if (connection) {
    tokenString = connection.context.authorization || "";
  } else {
    tokenString = req.headers.authorization || "";
  }

  if (tokenString) {
    const [_, token] = tokenString.split(" ");
    if (token) {
      user = await findUserFromToken(token);
    }
  }

  const authCallback = async ({ admin } = { admin: false }) => authenticate(user, admin);

  return {
    user,
    authenticate: authCallback,
  };
};

module.exports = {
  findUserFromToken,
  getToken,
  authMiddleware,
  appolloContext,
};
