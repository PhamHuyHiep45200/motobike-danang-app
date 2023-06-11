export const FormatNumber = (val) => {
  const num = Number(val);
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(
    num,
  ).split('￥')[1]
};
