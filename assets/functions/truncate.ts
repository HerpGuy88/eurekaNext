export default function truncateString(
  str: string,
  num: number,
  fromRight = false
): string {
  if (str.length > num) {
    return (
      (!fromRight ? str.slice(0, num) : str.slice(-num, str.length)) + "..."
    );
  } else {
    return str;
  }
}
