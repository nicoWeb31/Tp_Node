// const acceuil = (req, res) => {
//     res.status(200).send("Page d'acceuill !" );
// };

const acceuil = (req, res) => {
    res.status(200).render('pages/index.html.twig');
};

export default {
    acceuil
    //test
};