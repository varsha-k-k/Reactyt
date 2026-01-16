export function convertCenttoDollar(amountCents)
{
     return `$${(amountCents / 100).toFixed(2)}`
}