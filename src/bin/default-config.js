function init() {
    return new Promise((resolve) => {
        console.log('default config');
        process.env.MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://leanecharpentier:ZJuEnadLTKugad44@cluster0.f3skjix.mongodb.net/socksmate-dev"
        process.env.DB_NAME = "socksmate-dev"
        process.env.PORT = process.env.PORT || 3000
        process.env.SECRET_KEY = process.env.SECRET_KEY || "secretKey"
        return resolve('ok');
    })
}

export {init};