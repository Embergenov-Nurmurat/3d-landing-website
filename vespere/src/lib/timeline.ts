import {createRemap, type Beat} from './timeRemap';
import {DURATION} from './frames';
import {clamp, easeOutCubic, range} from './math';

/**
 * The whole page is one camera move: the man in the rainy alley → push in to
 * the wrist and the dial (card 01) → orbit to the side of the case and crown
 * (card 02) → down the wrist to the strap and buckle (card 03) → a fast
 * rewind back to the wide shot for the last line. `u` is scroll progress
 * through the pinned stage.
 *
 * Film seconds (24 fps, 701 frames): 0–8.5 street → wrist and dial (clean),
 * 8.5–19.2 dial macro → case side, 19.2–29.2 case side → strap and buckle.
 *
 * The generated dial macro (frames ~236–405) carries a crown-like mark and
 * garbled lettering, so card 01 lands on the clean wrist shot at 8.54 s and
 * the camera rushes through the macro; the Stage softens that stretch (VEIL_FRAMES).
 */

const END = DURATION;

/** Film seconds where a card holds: dial on the wrist, case side, buckle. */
export const HOLD_SECONDS = [8.54, 19.2, END];

/** Frame range (0-based) of the dial macro, softened while the camera passes through it. */
export const VEIL_FRAMES: [from: number, to: number] = [236, 405];
export const VEIL_RAMP = 10;

export const BEATS: Beat[] = [
  [0, 0],
  [0.055, 0], // hero holds while its type blurs away
  [0.16, 5.6], // push in past the coat sleeve to the wrist
  [0.25, HOLD_SECONDS[0]], // land on the dial (wrist shot)
  [0.39, HOLD_SECONDS[0]], // hold — card 01
  [0.52, HOLD_SECONDS[1]], // orbit to the side of the case
  [0.66, HOLD_SECONDS[1]], // hold — card 02
  [0.78, END], // down to the strap and buckle
  [0.89, END], // hold — card 03
  [0.955, 0], // rewind to the wide shot
  [1, 0],
];

export const REMAP = createRemap(BEATS, DURATION);

export type CardWindow = {inA: number; inB: number; outA: number; outB: number; side: 'left' | 'right'};

export const CARDS: CardWindow[] = [
  {inA: 0.262, inB: 0.296, outA: 0.362, outB: 0.388, side: 'left'},
  {inA: 0.532, inB: 0.566, outA: 0.632, outB: 0.658, side: 'right'},
  {inA: 0.792, inB: 0.826, outA: 0.862, outB: 0.888, side: 'left'},
];

/** 0 → 1 as the card slides in (eased out), 1 → 0 as it leaves (eased in). */
export function cardAmount(u: number, w: CardWindow): number {
  if (u <= w.inA || u >= w.outB) return 0;
  if (u < w.inB) return easeOutCubic(range(u, w.inA, w.inB));
  if (u <= w.outA) return 1;
  const t = range(u, w.outA, w.outB);
  return 1 - t * t * t;
}

/** How far through a card's hold we are (for the slow drift-in while it's open). */
export const holdAmount = (u: number, w: CardWindow) => clamp((u - w.inA) / (w.outB - w.inA));

/** Hero copy out, outro copy in. */
export const HERO_OUT: [number, number] = [0.006, 0.07];
export const OUTRO_IN: [number, number] = [0.93, 0.975];

/**
 * Where the watch sits in the frame (0–1) at each film second. Used to keep
 * it in view when a card narrows the film, and to steer the crop on portrait
 * phones.
 */
export const FOCAL: [t: number, x: number, y: number][] = [
  [0, 0.42, 0.5],
  [6, 0.42, 0.55],
  [HOLD_SECONDS[0], 0.46, 0.45],
  [10.5, 0.5, 0.5],
  [HOLD_SECONDS[1], 0.4, 0.5],
  [END, 0.43, 0.5],
];

export function focalAt(t: number): [number, number] {
  let i = 0;
  while (i < FOCAL.length - 2 && t > FOCAL[i + 1][0]) i++;
  const [t0, x0, y0] = FOCAL[i];
  const [t1, x1, y1] = FOCAL[i + 1];
  const k = clamp((t - t0) / (t1 - t0));
  return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k];
}
