export const currencyFormat = (n: number | string, currency = 'USD') => {
try {
return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number(n) || 0);
} catch {
return `$${Number(n).toFixed(2)}`;
}
};


export const todayISO = () => new Date().toISOString();


export const monthKey = (d?: string | number | Date) => {
const dt = d ? new Date(d) : new Date();
return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
};