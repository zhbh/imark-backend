import express, { Request, Response, NextFunction } from "express";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import logger from "morgan";
import "express-async-errors";

import loginRouter from "./routes/login";
import logoutRouter from "./routes/logout";
import registerRouter from "./routes/register";
import eventsRouter from "./routes/events";
import usersRouter from "./routes/user";
import categoryRouter from "./routes/category";
import favoriteRouter from "./routes/favorite";

import dotenv from "dotenv";
dotenv.configDotenv();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: "abc123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.SYS_ENV === "production", maxAge: 60 * 60 * 24 * 1000 },
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  const referer = req.get('Referer');
  if (!referer) {
    res.send({ message: 'Referer is empty.' });
    return;
  }

  const path = new URL(referer);
  console.log("🚀 ~ app.use ~ path :", path)
  console.log("🚀 ~ app.use ~ req.session:", req.session)

  if (!(path.pathname === "/") && !req.url.includes("/login") && !req.url.includes("/logout") && !req.url.includes("/register")) {
    if (!(req.session as any).user) {
      return res.status(401).json({ message: "Please log in" });
    }
  }
  next();
});

app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/register", registerRouter);
app.use("/api/event", eventsRouter);
app.use("/api/user", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/favorite", favoriteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).json({ message: err.message });
});

function createError(arg0: number): any {
  throw new Error("Function not implemented.");
}

export default app;