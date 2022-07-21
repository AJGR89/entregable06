const log4js = require("log4js");

log4js.configure({
  appenders: {
    loggerConsole: { type: "console" },
    loggerWarnFile: { type: "file", filename: "warn.log" },
    loggerErrorFile: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["loggerConsole"], level: "info" },
    consola: { appenders: ["loggerConsole"], level: "info" },
    mywarn: { appenders: ["loggerWarnFile", "loggerConsole"], level: "warn" },
    myerror: {
      appenders: ["loggerErrorFile", "loggerConsole"],
      level: "error",
    },
    // todos: { appenders: ["warn.log", "error.log", "loggerConsole"], level: "error" },
  },
});

const loggerRoutes = (req, res, next) => {
  const logger = log4js.getLogger("console");
  logger.info(`route: '${req.url}' || method: ${req.method}`);
  return next();
};

const loggerNoRoutes = (req, res, next) => {
  const logger = log4js.getLogger("mywarn");
  logger.warn(`route: '${req.url}' || method: ${req.method}`);
  return next();
};

const loggerE = log4js.getLogger("myerror");

module.exports = {
  loggerRoutes,
  loggerNoRoutes,
  loggerE,
};
