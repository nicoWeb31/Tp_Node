const acceuil = (req, res) => {
    res.status(200).send("Page d'acceuill !" );
};

const test = (req, res) => {
    res.status(200).render('pages/index');
};

export default {
    acceuil,
    test
};