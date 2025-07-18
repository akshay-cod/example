exports.startServer = (app) => {
    app.listen(process.env.PORT, () =>
    console.log(`Server started on ${process.env.PORT}`)
  );
}