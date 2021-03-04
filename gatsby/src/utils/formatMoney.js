const formatter = Intl.NumberFormat('ga', {
    style: 'currency',
    currency: 'EUR',
});

export default function formatMoney(cent) {
    return formatter.format(cent/100);
}