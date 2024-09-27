"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
require("express-async-errors");
const login_1 = __importDefault(require("./routes/login"));
const logout_1 = __importDefault(require("./routes/logout"));
const register_1 = __importDefault(require("./routes/register"));
const events_1 = __importDefault(require("./routes/events"));
const user_1 = __importDefault(require("./routes/user"));
const category_1 = __importDefault(require("./routes/category"));
const favorite_1 = __importDefault(require("./routes/favorite"));
var app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, express_session_1.default)({
    secret: "abc123",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 24 * 1000 },
}));
app.use((req, res, next) => {
    if (!req.url.includes("/") && !req.url.includes("/login") && !req.url.includes("/logout") && !req.url.includes("/register")) {
        if (!req.session.user) {
            return res.status(401).json({ message: "Please log in" });
        }
    }
    next();
});
app.use("/api/login", login_1.default);
app.use("/api/logout", logout_1.default);
app.use("/api/register", register_1.default);
app.use("/api/event", events_1.default);
app.use("/api/user", user_1.default);
app.use("/api/category", category_1.default);
app.use("/api/favorite", favorite_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    res.status(500).json({ message: err.message });
});
exports.default = app;
function createError(arg0) {
    throw new Error("Function not implemented.");
}
