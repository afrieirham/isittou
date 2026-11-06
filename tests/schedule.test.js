import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getStatus } from '../schedule.js';

test('weekday boundaries follow GMT+8', () => {
  for (const [time, expected] of [
    ['2026-11-06T13:59:59.999+08:00', 'yes'],
    ['2026-11-06T14:00:00+08:00', 'no'],
    ['2026-11-06T21:59:59.999+08:00', 'no'],
    ['2026-11-06T22:00:00+08:00', 'yes'],
    ['2026-11-06T00:00:00+08:00', 'yes'],
    ['2026-11-09T13:59:59+08:00', 'yes'],
    ['2026-11-09T14:00:00+08:00', 'no'],
  ]) assert.equal(getStatus(new Date(time)), expected, time);
});

test('every hour of Saturday and Sunday stays green', () => {
  for (const day of ['07', '08']) {
    for (let hour = 0; hour < 24; hour++) {
      const date = new Date(`2026-11-${day}T${String(hour).padStart(2, '0')}:00:00+08:00`);
      assert.equal(getStatus(date), 'yes', date.toISOString());
    }
  }
});

test('GMT+8 determines the day even when the UTC date differs', () => {
  assert.equal(getStatus(new Date('2026-11-06T17:00:00Z')), 'yes'); // Saturday
  assert.equal(getStatus(new Date('2026-11-08T17:00:00Z')), 'yes'); // Monday, 1 AM
  assert.equal(getStatus(new Date('2026-11-09T06:00:00Z')), 'no'); // Monday, 2 PM
});
