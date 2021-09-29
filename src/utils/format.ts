/** Formats money amounts */
export const formatAmount = (amount: string | number | undefined): string =>
  `${amount}`.replace(/[^\d.]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/** Formats PAN  */
export const formatPan = (pan: string | number | undefined): string =>
  `${pan}`
    .replace(/\D+/g, "")
    .replace(/\W/gi, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();

/** Formats phone numbers  */
export const formatPhone = (pan: string | number | undefined): string =>
  `${pan}`.replace(/\D+/g, "").replace(/\W/gi, "").trim();

/** Formats phone numbers  */
export const abbreviateNumber = (value: number | string) => {
  const SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];
  const _number = Number(value);

  let tier = (Math.log10(Math.abs(_number)) / 3) | 0;
  if (tier === 0) return _number.toString();

  let suffix = SI_SYMBOL[tier];
  let scale = Math.pow(10, tier * 3);
  let scaled = _number / scale;

  return scaled.toFixed(1).concat(suffix);
};

/** First capital */
export const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1)?.toLowerCase();
