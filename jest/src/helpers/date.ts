/** Returns date as eg. 5 Oct 2022 08:40 */
export function getLocalFormattedDate(date: Date) {
  const month = date.toLocaleString('default', { month: 'short' });
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const mins = String(date.getMinutes()).padStart(2, '0');

  return `${dayOfMonth} ${month} ${year} ${hours}:${mins}`;
}
