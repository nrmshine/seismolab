/**
 * Pure engineering calculations for seismic structural resilience,
 * finite element stresses (FEA), accelerograms, and building drift according to SP RK 2.03-2017.
 */

export type SoilCategory = 'I' | 'II' | 'III';

export type ArchetypeId = 'panel-9' | 'monolith-16' | 'steel-24' | 'adobe-1' | 'koktobe-tower';

export type IsolationType = 'LRB-800' | 'friction-pendulum' | 'viscous-damper' | 'none';

export interface ArchetypeConfig {
  id: ArchetypeId;
  name: string;
  nameKz: string;
  nameEn: string;
  subtitle: string;
  floors: number;
  heightMeters: number;
  columnSpanMeters: number;
  baseResistanceMsk: number; // Native design resistance in MSK-64
  fundamentalPeriodSec: number;
  dampingRatio: number;
  criticalFailureIntensity: number;
  defaultIsolation: IsolationType;
}

export const ARCHETYPES: Record<ArchetypeId, ArchetypeConfig> = {
  'panel-9': {
    id: 'panel-9',
    name: 'Советская панель 9 эт.',
    nameKz: 'Кеңестік 9 қабатты панель',
    nameEn: 'Soviet 9-Story Panel',
    subtitle: 'Серия 1-464-АС • Алматы 1982',
    floors: 9,
    heightMeters: 28.8,
    columnSpanMeters: 5.4,
    baseResistanceMsk: 8.0,
    fundamentalPeriodSec: 0.65,
    dampingRatio: 0.05,
    criticalFailureIntensity: 9.2,
    defaultIsolation: 'none',
  },
  'monolith-16': {
    id: 'monolith-16',
    name: 'Монолитный ригель 16 эт.',
    nameKz: '16 қабатты монолитті ригель',
    nameEn: '16-Story Monolithic RC Frame',
    subtitle: 'ЖК Премиум каркас • СП РК 2.03-2017',
    floors: 16,
    heightMeters: 51.2,
    columnSpanMeters: 6.6,
    baseResistanceMsk: 9.0,
    fundamentalPeriodSec: 1.15,
    dampingRatio: 0.04,
    criticalFailureIntensity: 10.1,
    defaultIsolation: 'LRB-800',
  },
  'steel-24': {
    id: 'steel-24',
    name: 'Стальной небоскреб 24 эт.',
    nameKz: '24 қабатты болат зәулім үй',
    nameEn: '24-Story Steel Skyscraper',
    subtitle: 'Трубчато-ферменная система с демпферами',
    floors: 24,
    heightMeters: 86.4,
    columnSpanMeters: 8.0,
    baseResistanceMsk: 9.5,
    fundamentalPeriodSec: 1.85,
    dampingRatio: 0.035,
    criticalFailureIntensity: 10.6,
    defaultIsolation: 'viscous-damper',
  },
  'adobe-1': {
    id: 'adobe-1',
    name: 'Саманный дом (Традиционный)',
    nameKz: 'Саман үй (Дәстүрлі)',
    nameEn: 'Traditional Adobe House',
    subtitle: 'Критический риск разрушения при >6.5',
    floors: 1,
    heightMeters: 3.5,
    columnSpanMeters: 4.0,
    baseResistanceMsk: 6.0,
    fundamentalPeriodSec: 0.15,
    dampingRatio: 0.07,
    criticalFailureIntensity: 6.8,
    defaultIsolation: 'none',
  },
  'koktobe-tower': {
    id: 'koktobe-tower',
    name: 'Kok-Tobe Tower B-12',
    nameKz: 'Көк-Төбе мұнарасы B-12',
    nameEn: 'Kok-Tobe Tower B-12',
    subtitle: 'Высотная доминанта • LRB-800 сейсмоизоляция',
    floors: 12,
    heightMeters: 38.4,
    columnSpanMeters: 6.0,
    baseResistanceMsk: 9.2,
    fundamentalPeriodSec: 0.71,
    dampingRatio: 0.05,
    criticalFailureIntensity: 10.2,
    defaultIsolation: 'LRB-800',
  },
};

/**
 * Calculates Peak Ground Acceleration (PGA in g) from MSK-64 intensity
 */
export function calculatePGA(intensityMsk: number): number {
  // Semi-empirical correlation for Kazakhstan Tian Shan zone
  // 5.0 -> 0.04g, 7.0 -> 0.14g, 8.0 -> 0.27g, 8.5 -> 0.38g, 9.0 -> 0.52g, 10.0 -> 0.99g
  const pga = 0.04 * Math.pow(1.9, intensityMsk - 5.0);
  return Number(Math.max(0.02, Math.min(2.0, pga)).toFixed(2));
}

/**
 * Soil amplification factor as per SP RK 2.03-2017
 */
export function getSoilFactor(soil: SoilCategory): number {
  switch (soil) {
    case 'I': // Rocky ground
      return 0.85;
    case 'II': // Loam (typical Almaty plains)
      return 1.0;
    case 'III': // Soft water-saturated sands/clay
      return 1.35;
  }
}

/**
 * Isolation effectiveness multiplier
 */
export function getIsolationDampingMultiplier(isolation: IsolationType): number {
  switch (isolation) {
    case 'LRB-800':
      return 0.42; // Reduces base shear by ~58%
    case 'friction-pendulum':
      return 0.38; // Reduces base shear by ~62%
    case 'viscous-damper':
      return 0.55; // Reduces swaying by ~45%
    case 'none':
      return 1.0;
  }
}

export interface ResilienceResult {
  score: number; // 0 - 100
  grade: 'GRADE A' | 'GRADE B' | 'GRADE C' | 'GRADE D' | 'GRADE F';
  residualResourcePercent: number; // 0 - 100%
  interstoryDriftPercent: number; // e.g. 0.62%
  maxDisplacementMm: number; // e.g. 12.4 mm
  isSafe: boolean;
  survivableMagnitude: number; // e.g. 9.2
  baseShearKn: number;
}

export function calculateResilience(
  archetypeId: ArchetypeId,
  intensityMsk: number,
  soil: SoilCategory,
  isolation: IsolationType,
  overrideFloors?: number
): ResilienceResult {
  const arch = ARCHETYPES[archetypeId] || ARCHETYPES['koktobe-tower'];
  const floors = overrideFloors ?? arch.floors;
  const soilFactor = getSoilFactor(soil);
  const isoMultiplier = getIsolationDampingMultiplier(isolation);

  const effectiveLoad = (intensityMsk / arch.baseResistanceMsk) * soilFactor * (0.55 + 0.45 * isoMultiplier);

  // Maximum displacement in mm:
  const baseDisp = 2.4 * Math.pow(effectiveLoad, 2.1) * (floors / 10);
  const maxDisplacementMm = Number(Math.max(0.5, baseDisp).toFixed(1));

  // Interstory drift % = delta / floor height (avg 3200mm)
  const floorHeightMm = 3200;
  const driftPerFloorMm = baseDisp / Math.max(1, floors * 0.45);
  const interstoryDriftPercent = Number(((driftPerFloorMm / floorHeightMm) * 100).toFixed(2));

  // Residual resource after cycle
  const damageFactor = Math.max(0, effectiveLoad - 0.75);
  const residualResourcePercent = Number(Math.max(5, 100 - damageFactor * 42).toFixed(1));

  // Resilience score (0-100)
  let rawScore = 100 - (effectiveLoad - 0.5) * 45;
  if (isolation !== 'none') rawScore += 12;
  if (soil === 'I') rawScore += 5;
  if (soil === 'III') rawScore -= 14;
  if (archetypeId === 'adobe-1' && intensityMsk >= 7.0) rawScore = Math.min(rawScore, 18);

  const score = Math.max(8, Math.min(99, Math.round(rawScore)));

  let grade: ResilienceResult['grade'] = 'GRADE A';
  if (score >= 88) grade = 'GRADE A';
  else if (score >= 74) grade = 'GRADE B';
  else if (score >= 58) grade = 'GRADE C';
  else if (score >= 40) grade = 'GRADE D';
  else grade = 'GRADE F';

  const isSafe = score >= 60 && interstoryDriftPercent <= 1.5;

  // Estimated survivable magnitude
  let survivable = arch.criticalFailureIntensity;
  if (isolation === 'LRB-800' || isolation === 'friction-pendulum') survivable += 0.8;
  if (soil === 'I') survivable += 0.3;
  if (soil === 'III') survivable -= 0.6;
  const survivableMagnitude = Number(Math.min(10.5, survivable).toFixed(1));

  // Base shear force Q_base (kN)
  // Building weight approx 12 kN/m2 * area * floors
  const floorArea = arch.columnSpanMeters * arch.columnSpanMeters * 9;
  const totalWeightKn = floorArea * floors * 11.5;
  const seismicCoeff = (calculatePGA(intensityMsk) / 1.0) * soilFactor * isoMultiplier;
  const baseShearKn = Math.round(totalWeightKn * Math.max(0.04, seismicCoeff * 0.45));

  return {
    score,
    grade,
    residualResourcePercent,
    interstoryDriftPercent,
    maxDisplacementMm,
    isSafe,
    survivableMagnitude,
    baseShearKn,
  };
}

export interface FeaRow {
  element: string;
  elementEn: string;
  elementKz: string;
  stressType: string;
  stressTypeEn: string;
  stressTypeKz: string;
  stressMpa: number;
  limitMpa: number;
  status: 'safe' | 'warning' | 'danger';
  statusText: string;
  statusTextEn: string;
  statusTextKz: string;
}

export function calculateFeaStresses(
  intensityMsk: number,
  archetypeId: ArchetypeId,
  isolation: IsolationType
): FeaRow[] {
  const pga = calculatePGA(intensityMsk);
  const isoMult = getIsolationDampingMultiplier(isolation);
  const factor = (pga / 0.38) * (0.6 + 0.4 * isoMult);

  // Column stress
  const colMpa = Number((14.5 * factor).toFixed(1));
  const colLimit = 25.0;

  // Shear wall
  const wallMpa = Number((9.2 * factor).toFixed(1));
  const wallLimit = 16.0;

  // Plastic hinge joint
  const hingeMpa = Number((4.8 * factor).toFixed(1));
  const hingeLimit = 9.5;

  // LRB damping / energy dissipation %
  const dissipationPercent = isolation !== 'none' ? Math.min(88, Math.round(72 + (1 - isoMult) * 20)) : 14;

  return [
    {
      element: 'Колонны 1–3 эт.',
      elementEn: 'Columns 1–3 floors',
      elementKz: '1–3 қабат бағандары',
      stressType: 'Сжатие с изгибом',
      stressTypeEn: 'Compression with bending',
      stressTypeKz: 'Иілумен қысылу',
      stressMpa: colMpa,
      limitMpa: colLimit,
      status: colMpa <= 19 ? 'safe' : colMpa <= colLimit ? 'warning' : 'danger',
      statusText: colMpa <= 19 ? 'Безопасно' : colMpa <= colLimit ? 'Предел текучести' : 'Разрушение',
      statusTextEn: colMpa <= 19 ? 'Safe' : colMpa <= colLimit ? 'Yield limit' : 'Failure',
      statusTextKz: colMpa <= 19 ? 'Қауіпсіз' : colMpa <= colLimit ? 'Шекті жүктеме' : 'Бұзылу',
    },
    {
      element: 'Диафрагмы жесткости',
      elementEn: 'Shear Walls (Diaphragms)',
      elementKz: 'Қаттылық диафрагмалары',
      stressType: 'Касательное напряжение τ',
      stressTypeEn: 'Shear stress τ',
      stressTypeKz: 'Жанама кернеу τ',
      stressMpa: wallMpa,
      limitMpa: wallLimit,
      status: wallMpa <= 12 ? 'safe' : wallMpa <= wallLimit ? 'warning' : 'danger',
      statusText: wallMpa <= 12 ? 'В норме' : wallMpa <= wallLimit ? 'Трещинообразование' : 'Сдвиг',
      statusTextEn: wallMpa <= 12 ? 'Nominal' : wallMpa <= wallLimit ? 'Cracking onset' : 'Shear failure',
      statusTextKz: wallMpa <= 12 ? 'Қалыпты' : wallMpa <= wallLimit ? 'Жарықшақтар' : 'Ығысу',
    },
    {
      element: 'Узлы ригель-колонна',
      elementEn: 'Beam-Column Joints',
      elementKz: 'Ригель-баған түйіндері',
      stressType: 'Пластический шарнир #B4',
      stressTypeEn: 'Plastic hinge #B4',
      stressTypeKz: 'Пластикалық топса #B4',
      stressMpa: hingeMpa,
      limitMpa: hingeLimit,
      status: hingeMpa <= 6.5 ? 'safe' : hingeMpa <= hingeLimit ? 'warning' : 'danger',
      statusText: hingeMpa <= 6.5 ? 'Упругая стадия' : hingeMpa <= hingeLimit ? 'Пластич. деформация' : 'Срез болтов',
      statusTextEn: hingeMpa <= 6.5 ? 'Elastic state' : hingeMpa <= hingeLimit ? 'Plastic deformation' : 'Bolt shear',
      statusTextKz: hingeMpa <= 6.5 ? 'Серпімді күй' : hingeMpa <= hingeLimit ? 'Пластикалық деформ.' : 'Болт кесілуі',
    },
    {
      element: isolation !== 'none' ? 'LRB-Демпферы базы' : 'Жесткий фундамент',
      elementEn: isolation !== 'none' ? 'Base LRB Dampers' : 'Rigid Foundation',
      elementKz: isolation !== 'none' ? 'Іргетас LRB-демпферлері' : 'Қатты іргетас',
      stressType: isolation !== 'none' ? 'Энергопоглощение цикла' : 'Передача 100% импульса',
      stressTypeEn: isolation !== 'none' ? 'Cycle energy dissipation' : '100% impulse transfer',
      stressTypeKz: isolation !== 'none' ? 'Циклдік энергияны жұту' : '100% импульс беру',
      stressMpa: dissipationPercent,
      limitMpa: 100,
      status: isolation !== 'none' ? 'safe' : 'warning',
      statusText: isolation !== 'none' ? 'Высокое рассеяние' : 'Без изоляции',
      statusTextEn: isolation !== 'none' ? 'High dissipation' : 'No isolation',
      statusTextKz: isolation !== 'none' ? 'Жоғары сейілту' : 'Оқшаулаусыз',
    },
  ];
}

/**
 * Calculates Evacuation simulation time
 */
export function calculateEvacuation(floors: number, occupantsPerFloor: number = 32, stairwellWidthM: number = 1.35) {
  const totalOccupants = floors * occupantsPerFloor;
  // Specific capacity: ~1.2 people per second per meter of stairwell width
  const peoplePerSecond = stairwellWidthM * 1.25;
  const seconds = Math.ceil(totalOccupants / peoplePerSecond + (floors * 4.5));
  const minutes = Math.floor(seconds / 60);
  const remainingSec = seconds % 60;

  return {
    totalOccupants,
    totalSeconds: seconds,
    formattedTime: `${minutes} мин ${remainingSec.toString().padStart(2, '0')} сек`,
    bottleneckFloor: Math.min(2, Math.floor(floors / 4)),
    isWithinNorm: seconds < 360, // Standard requires < 6 minutes evacuation
  };
}
