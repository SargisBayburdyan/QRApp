//Server listening on port
exports.PORT = process.env.PORT || 5000;

//Client URL
exports.CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_ORIGIN
    : "http://localhost:3000";

//Database URL
exports.DB_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : "mongodb+srv://qrapp:QRdatabase1@qrdb-sylpy.mongodb.net/QRDB?retryWrites=true&w=majority";

exports.DOWNLOAD_DIRECTORY = "./downloads";
