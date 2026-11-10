import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePGA,
  getSoilFactor,
  getIsolationDampingMultiplier,
  calculateResilience,
  calculateFeaStresses,
  calculateEvacuation,
} from './seismicCalculations.js';

test('calculatePGA returns expected values for Tian Shan seismic intensities', () => {
  const pgaLow = calculatePGA(5.0);
  const pgaModerate = calculatePGA(7.0);
  const pgaDesign = calculatePGA(8.5);
  const pgaExtreme = calculatePGA(10.0);

  assert.ok(pgaLow >= 0.02 && pgaLow <= 0.08);
  assert.ok(pgaModerate > pgaLow);
  assert.ok(pgaDesign >= 0.30 && pgaDesign <= 0.45);
  assert.ok(pgaExtreme > pgaDesign);
});

test('soil amplification follows SP RK 2.03-2017 coefficients', () => {
  assert.equal(getSoilFactor('I'), 0.85);
  assert.equal(getSoilFactor('II'), 1.0);
  assert.equal(getSoilFactor('III'), 1.35);
});

test('isolation multipliers reduce dynamic loads', () => {
  const lrb = getIsolationDampingMultiplier('LRB-800');
  const none = getIsolationDampingMultiplier('none');
  assert.ok(lrb < none);
  assert.equal(none, 1.0);
});

test('resilience calculation correctly grades Kok-Tobe Tower under 8.5 intensity', () => {
  const resultWithLrb = calculateResilience('koktobe-tower', 8.5, 'II', 'LRB-800');
  assert.ok(resultWithLrb.score >= 80, `Expected score >= 80, got ${resultWithLrb.score}`);
  assert.ok(resultWithLrb.interstoryDriftPercent < 1.5, 'Drift should be within code <1.5%');
  assert.ok(resultWithLrb.isSafe, 'Tower with LRB should be safe under 8.5 MSK');

  const resultAdobe = calculateResilience('adobe-1', 8.5, 'II', 'none');
  assert.ok(resultAdobe.score < 40, 'Adobe building must have low score under 8.5 MSK');
  assert.equal(resultAdobe.grade, 'GRADE F');
  assert.equal(resultAdobe.isSafe, false);
});

test('FEA stresses reflect intensity and damper effects', () => {
  const stresses = calculateFeaStresses(8.5, 'koktobe-tower', 'LRB-800');
  assert.equal(stresses.length, 4);
  assert.equal(stresses[0].element, 'Колонны 1–3 эт.');
  assert.ok(stresses[0].stressMpa > 0);
  assert.equal(stresses[3].status, 'safe');
});

test('evacuation calculation yields realistic timings', () => {
  const evac = calculateEvacuation(12, 30, 1.35);
  assert.ok(evac.totalOccupants === 360);
  assert.ok(evac.totalSeconds > 60 && evac.totalSeconds < 600);
  assert.match(evac.formattedTime, /мин.*сек/);
});
