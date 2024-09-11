function init() {
    return new Promise((resolve) => {
        console.log('dev config');
        process.env.MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/socksmate-test"
        process.env.DB_NAME = "socksmate-test"
        process.env.PORT = process.env.PORT || 3000
        process.env.SECRET_KEY = process.env.SECRET_KEY || "secretKey"
        return resolve('ok');
    })
}

export {init};