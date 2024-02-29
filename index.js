import express from 'express'
import { AppError } from './src/utils/AppError.js'
import dbconnection from "./databases/dbconnection.js"
import cors from 'cors'
import userRouter from './src/modules/auth/auth.router.js'
import statusRouter from './src/modules/status/statusRoute.js'
import transRoute from './src/modules/trans/transRoute.js'
import dotenv from 'dotenv'
import i18n from './config/i18n.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url';
import { Cookies } from 'nodemailer/lib/fetch/index.js'
// import i18n from './i18n';






// import i18next from 'i18next';
// import backend from 'i18next-http-backend';
// import languageDetector from 'i18next-browser-languagedetector';
// Initialize i18next
// i18next
//     .use(backend)
//     .use(languageDetector)
//     .init({
//         fallbackLng: 'en', // Default language
//         backend: {
//             loadPath: 'locales/{{lng}}/{{ns}}.json', // Path to translation files
//         },
//     });
dbconnection()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// i18n.configure({
//     locales: ['en', 'ar'], // اللغات المدعومة
//     defaultLocale: 'ar', // اللغة الافتراضية
//     directory: `${__dirname}/locales`,
//     cookie: 'locale',
//     queryParameter: 'lang',
//     objectNotation: true, // تمكين الوصول إلى الترجمات باستخدام النقاط (مثل translations.home.title)
// });

// module.exports = i18n;

const app = express()
dotenv.config()
app.use(express.json())
app.use(express.static('uploads'))
app.use(cors())
app.use(i18n.init);


app.use('/trans', transRoute);
app.use('/users', userRouter)
app.use('/status', statusRouter)
// app.use(i18next.handle);

app.use(express.static('public'));


app.all('*', (req, res, next) => {
    next(new AppError("Page Not Found " + req.originalUrl, 404))
})
app.use((err, req, res, next) => {
    let code = err.statusCode || 403
    res.status(code).json({ message: err.message, stack: err.stack })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is Running ......");
})