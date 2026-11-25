import {useState, type Ref} from 'react';
import {brand, formatPrice, products, type Product} from '../content';
import {bagStore} from '../lib/bag';

type Props = {product: Product; side: 'left' | 'right'; ref?: Ref<HTMLElement>};

/**
 * The add-to-cart card that slides in once the camera has landed on a piece.
 * Desktop: a full-height ivory panel from the left or right edge (the Stage
 * narrows the film so the watch stays in view). Phones: a bottom sheet.
 * The Stage drives `transform` and the `[data-k]` stagger directly.
 */
export function ProductCard({product, side, ref}: Props) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const add = () => {
    bagStore.add(product.id, qty);
    bagStore.flash(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
  };

  return (
    <aside
      ref={ref}
      aria-label={`${product.name.join(' ')} — add to bag`}
      style={{visibility: 'hidden'}}
      className={`absolute z-30 flex flex-col bg-bone text-ink will-change-transform
        sheet:inset-x-0 sheet:bottom-0 sheet:h-[68%] sheet:rounded-t-[26px] sheet:px-5 sheet:pt-5 sheet:pb-[max(20px,env(safe-area-inset-bottom))]
        desk:inset-y-0 desk:w-[clamp(420px,41vw,640px)] desk:px-[clamp(28px,3vw,52px)] desk:pt-24 desk:pb-[clamp(20px,3vh,36px)]
        ${side === 'left' ? 'desk:left-0' : 'desk:right-0'}`}
    >
      <div data-k className="label flex items-center justify-between text-ink/45">
        <span>
          N°{product.index} <span className="text-ink/25">/ 0{products.length}</span>
        </span>
        <span>{brand.collection}</span>
      </div>

      <div className="mt-[clamp(10px,2.4vh,26px)] sheet:flex sheet:items-end sheet:gap-4">
        <div className="min-w-0 flex-1">
          <p data-k className="label text-brass-deep">
            {product.eyebrow}
          </p>
          <h3 data-k className="display mt-2 text-[clamp(40px,4.3vw,78px)] sheet:text-[40px]">
            {product.name[0]} <em>{product.name[1]}</em>
          </h3>
          <p data-k className="mt-2 text-[13px] font-medium text-ink/70">
            {product.material}
          </p>
        </div>
      </div>

      <p data-k className="mt-3 max-w-[46ch] text-[13px] leading-[1.55] text-ink/55 sheet:line-clamp-2 sheet:text-[12.5px]">
        {product.description}
      </p>

      <figure
        data-k
        className="relative mt-[clamp(12px,2.4vh,24px)] min-h-0 flex-1 overflow-hidden rounded-[22px] bg-ink-2"
      >
        <img
          src={product.image}
          alt={`${product.name.join(' ')}, ${product.material}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <figcaption className="label absolute bottom-3 left-4 text-bone/60">Sapphire · Steel</figcaption>
        <span className="label absolute top-3 right-4 text-bone/60">{product.index}</span>
      </figure>

      <dl data-k className="mt-4 grid grid-cols-3 gap-3 border-t border-ink/10 pt-3">
        {product.specs.map(([k, v]) => (
          <div key={k}>
            <dt className="label text-ink/40">{k}</dt>
            <dd className="mt-1 text-[12.5px] font-medium">{v}</dd>
          </div>
        ))}
      </dl>

      <div data-k className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={add}
          className="glint label h-12 flex-1 rounded-full bg-ink px-5 text-bone transition-colors duration-500 hover:bg-graphite"
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            {added ? (
              <>
                <span className="inline-block size-1.5 rounded-full bg-brass" /> Added to bag
              </>
            ) : (
              'Add to bag'
            )}
          </span>
        </button>
        <div className="label flex h-12 items-center rounded-full border border-ink/15 text-ink/70">
          <button type="button" aria-label="Decrease quantity" className="h-full px-3.5" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            −
          </button>
          <span className="w-4 text-center tabular-nums" aria-live="polite">
            {qty}
          </span>
          <button type="button" aria-label="Increase quantity" className="h-full px-3.5" onClick={() => setQty((q) => Math.min(9, q + 1))}>
            +
          </button>
        </div>
        <p className="display ml-1 text-[clamp(26px,2.2vw,36px)] whitespace-nowrap">{formatPrice(product.price * qty)}</p>
      </div>
    </aside>
  );
}
