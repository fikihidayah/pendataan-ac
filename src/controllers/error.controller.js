import express from "express";

class ErrorController {
  /**
   * Error Log
   * @param {Error} err
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static log(err, req, res, next) {
    const error = err.message.split("\n");
    let code = "";
    error.forEach((value, index) => {
      if (index === 0 || index === error.length - 1) {
        return;
      }
      code += `\n ${value}`;
    });

    const message = {
      file: error.at(0),
      sc: code,
      detail: error.at(-1),
    };

    console.log(err.name);
    console.log(err.message);

    err.message = message;
    let stack = err.stack.split("\n");
    stack.shift();
    stack = stack.join("\n");
    console.log(stack);

    next(err); // teruskan ke error selanjutnya
  }

  /**
   * Error dikirim melalui response
   * @param {Error} err
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static response(err, req, res, next) {
    const errStatus = err.statusCode || 500;

    if (req.xhr) {
      return res.status(errStatus).json({
        status: errStatus,
        message: err.message ?? "Server error",
        stack: process.env.NODE_ENV != "production" ? err.stack : "Server error",
      });
    }
    res.status(errStatus).render("errors/500", {
      title: "Error",
      error: err,
    });
  }

  /**
   * Error page not found
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  static notfound(req, res, next) {
    res.status(404).render("errors/404", {
      title: "404 - Not Found",
      navSet: "404",
    });
  }
}

export default ErrorController;
