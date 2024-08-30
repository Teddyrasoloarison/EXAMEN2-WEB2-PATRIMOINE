import loadPossessions from './loadPossessions.js';

async function calculatePatrimoine(date) {
    const possessions = await loadPossessions();
    const dateEvaluation = new Date(date);

    const totalValue = possessions.reduce((acc, possession) => {
        return acc + possession.getValeur(dateEvaluation);
    }, 0);

    return totalValue;
}
export default calculatePatrimoine
// Exemple : Calculer le patrimoine pour le 30 août 2024
const patrimoineValue = await calculatePatrimoine('2024-08-30');
console.log('Valeur totale du patrimoine au 30 août 2024 :', patrimoineValue);
