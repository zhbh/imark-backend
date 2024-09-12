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
import usersRouter from "./routes/users";
import categoryRouter from "./routes/category";

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
    cookie: { maxAge: 60 * 60 * 24 * 1000 },
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  if (!req.url.includes("/login") && !req.url.includes("/logout") && !req.url.includes("/register")) {
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
app.use("/api/users", usersRouter);
app.use("/api/category", categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).json({ message: err.message });
});

app.listen(3001, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${3001}`);
});

module.exports = app;
function createError(arg0: number): any {
  throw new Error("Function not implemented.");
}