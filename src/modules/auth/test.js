// // Your model file

// const i18n = require('./i18n'); // Adjust the path based on your project structure

// class YourModel {
//     constructor() {
//         // Your model initialization
//     }

//     async getTranslatedData(locale) {
//         // Simulated data retrieval from a database or any source
//         const dataFromModel = {
//             title: 'greeting',
//             message: 'message',
//         };

//         // Set the locale for translation
//         i18n.setLocale(locale);

//         // Translate the data
//         const translatedData = {
//             greeting: i18n.__(dataFromModel.greeting),
//             message: i18n.__(dataFromModel.message),
//         };

//         return translatedData;
//     }
// }

// module.exports = YourModel;



// // Example usage in a route handler

// const express = require('express');
// const i18n = require('./i18n'); // Adjust the path based on your project structure
// const YourModel = require('./YourModel'); // Adjust the path based on your project structure

// const app = express();

// app.get('/getData/:locale', async (req, res) => {
//     const locale = req.params.locale;

//     const yourModelInstance = new YourModel();
//     const translatedData = await yourModelInstance.getTranslatedData(locale);

//     res.json(translatedData);
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// Assuming you are using Express

const express = require('express');
const translation = require('./translation'); // Adjust the path based on your project structure

const app = express();

// Set up your i18n middleware, if not already done
app.use(require('./i18n')); // Adjust the path based on your project structure

// Define your translation route
app.get('/translation/:lang', translation);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

