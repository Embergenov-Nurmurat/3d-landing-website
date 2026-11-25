import type {MouseEvent} from 'react';
import Lenis from 'lenis';

/**
 * One rAF loop for the whole page. Lenis advances first, then every
 * scroll-driven component reads its own rect and writes styles directly —
 * nothing here goes through React state, so scrolling never re-renders.
 */

type Tick = (time: number) => void;

const subscribers = new Set<Tick>();
let lenis: Lenis | null = null;
let locks = 0;

const applyLock = () => {
  const on = locks > 0;
  if (lenis) {
    if (on) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = on ? 'hidden' : '';
};

/** Freezes page scroll (preloader, open bag). Returns the matching release function. */
export function lockScroll(): () => void {
  locks++;
  applyLock();
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks = Math.max(0, locks - 1);
    applyLock();
  };
}

export function startScroll(reducedMotion: boolean): () => void {
  if (!reducedMotion) {
    lenis = new Lenis({lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9});
    applyLock();
  }

  let raf = 0;
  let reported = false;
  const guard = (fn: () => void) => {
    try {
      fn();
    } catch (err) {
      // Log once; never let a single bad frame stop smooth scrolling for the whole page.
      if (!reported) {
        reported = true;
        console.error(err);
      }
    }
  };
  const loop = (time: number) => {
    raf = requestAnimationFrame(loop);
    guard(() => lenis?.raf(time));
    subscribers.forEach((fn) => guard(() => fn(time)));
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
}

export function onFrame(fn: Tick): () => void {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}

/** Smooth-scrolls to an in-page hash like `#services`, or to the top for `#top`. */
export function scrollToHash(hash: string) {
  const target = hash === '#top' ? 0 : document.querySelector<HTMLElement>(hash);
  if (target === null) return;
  if (lenis) {
    lenis.scrollTo(target, {duration: 1.6});
  } else if (typeof target === 'number') {
    window.scrollTo({top: target});
  } else {
    target.scrollIntoView();
  }
  history.replaceState(null, '', hash === '#top' ? ' ' : hash);
}

/** Jumps (or glides) to an absolute scroll position — used by drag controls. */
export function scrollToY(y: number, immediate = true) {
  if (lenis) lenis.scrollTo(y, {immediate, duration: immediate ? 0 : 1.6});
  else window.scrollTo({top: y, behavior: immediate ? 'instant' : 'smooth'});
}

/** onClick for in-page `<a href="#…">` links so they glide instead of jumping. */
export function anchorClick(e: MouseEvent<HTMLAnchorElement>) {
  const hash = e.currentTarget.getAttribute('href');
  if (!hash || !hash.startsWith('#')) return;
  e.preventDefault();
  scrollToHash(hash);
}
