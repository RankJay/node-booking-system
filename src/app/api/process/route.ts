import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { NextResponse } from 'next/server';

export function POST() {
    const fileBuffer = fs.readFileSync('./public/test.csv');
    const records = parse(fileBuffer, { delimiter:', ' });

    const results = processBookings(records);
    return NextResponse.json({ results });
};

// Example implementation of processBookings
const processBookings = (records: Array<[number, number]>) => {
  let bookedIntervals = [];
  let results = [];

  for (let row of records) {
    let [start, end] = row;

    if (start === 0) {
      const index = end;
      if (index < 0 || index >= bookedIntervals.length) {
        results.push(`${start},${end} → Invalid Index`);
      } else {
        bookedIntervals.splice(index, 1);
        results.push(`${start},${end} → Removed`);
      }
    } else {
      let conflict = bookedIntervals.some(interval => start < interval[1] && end > interval[0]);
      if (!conflict) {
        bookedIntervals.push([start, end]);
        results.push(`${start},${end} → true`);
      } else {
        results.push(`${start},${end} → false`);
      }
    }
  }
  return results;
};