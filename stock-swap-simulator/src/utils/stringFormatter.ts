const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatNumberToPriceString(value: number) {
  return formatter.format(value);
}
