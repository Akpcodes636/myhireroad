// Blog scheduling uses US Eastern time (Florida), whatever time zone the
// server or the admin's computer is in. These convert between UTC and the
// "YYYY-MM-DDTHH:MM" value used by <input type="datetime-local">.

const TIME_ZONE = 'America/New_York';

/** Milliseconds Eastern time is ahead of UTC at the given moment (negative). */
function easternOffsetMs(date: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const asIfUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
  return asIfUtc - Math.floor(date.getTime() / 1000) * 1000;
}

/** ISO timestamp → "YYYY-MM-DDTHH:MM" in Eastern time. */
export function toEasternInputValue(iso: string | Date): string {
  const date = new Date(iso);
  return new Date(date.getTime() + easternOffsetMs(date)).toISOString().slice(0, 16);
}

/** "YYYY-MM-DDTHH:MM" in Eastern time → Date (or null if invalid). */
export function fromEasternInputValue(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return null;
  const asIfUtc = new Date(`${value}:00Z`);
  if (Number.isNaN(asIfUtc.getTime())) return null;
  // Apply the offset, then re-check it in case the time is near a DST change.
  let result = new Date(asIfUtc.getTime() - easternOffsetMs(asIfUtc));
  const corrected = easternOffsetMs(result);
  result = new Date(asIfUtc.getTime() - corrected);
  return result;
}

/** "Dec 1, 2026, 9:00 AM ET" */
export function formatEastern(iso: string): string {
  return `${new Date(iso).toLocaleString('en-US', {
    timeZone: TIME_ZONE,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })} ET`;
}

/** Tomorrow at 9:00 AM Eastern, as a default schedule time. */
export function defaultScheduleValue(): string {
  const tomorrow = toEasternInputValue(new Date(Date.now() + 24 * 60 * 60 * 1000));
  return `${tomorrow.slice(0, 10)}T09:00`;
}
