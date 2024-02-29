import i18n from '../config/i18n'

const translateModel = (req, res) => {
    const locale = req.query.lang;
    i18n.setLocale(locale);
    res.json(i18n.__('title'));
};

export default translateModel;