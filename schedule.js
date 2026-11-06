const OFFSET_MS = 8 * 60 * 60 * 1000;

/** Uses a fixed GMT+8 offset, independent of the device's timezone. */
export function getStatus(date = new Date()) {
  const local = new Date(date.getTime() + OFFSET_MS);
  const day = local.getUTCDay();
  const hour = local.getUTCHours();
  const isWeekend = day === 0 || day === 6;
  return isWeekend || hour < 14 || hour >= 22 ? 'yes' : 'no';
}
