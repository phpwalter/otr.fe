import React, {useLayoutEffect, useRef} from 'react';

/**
 * Shared anniversary header for wide, tall, and artwork-overlay featured panels.
 * The enclosing show skin selects .featured-anniversary--a, --b, or --c.
 * A: tall number, date centered below heading text.
 * B: tall number, date left-aligned below heading text.
 * C: equal-size number/text on one baseline, date centered below BOTH.
 */
export default function FeaturedAnniversaryHeader({
  years, text='YEARS AGO YESTERDAY', date='', className='', dateClassName=''
}) {
  const rootRef=useRef(null);
  useLayoutEffect(()=>{
    const root=rootRef.current;
    if(!root)return;
    const number=root.querySelector('.featured-anniversary__number');
    const label=root.querySelector('.featured-anniversary__label');
    const details=root.querySelector('.featured-anniversary__details');
    const dateNode=root.querySelector('.featured-anniversary__date');
    const canvas=document.createElement('canvas');
    const ctx=canvas.getContext('2d');
    if(!ctx)return;
    let raf=0;
    const glyph=(element)=>{
      const style=getComputedStyle(element);
      const size=parseFloat(style.fontSize)||16;
      ctx.font=[style.fontStyle,style.fontWeight,style.fontSize,style.fontFamily].join(' ');
      const metric=ctx.measureText(element.textContent.trim()||'0');
      return {
        ascent:metric.actualBoundingBoxAscent||size*.75,
        descent:metric.actualBoundingBoxDescent||size*.2,
        lineHeight:style.lineHeight==='normal'?size*1.2:parseFloat(style.lineHeight)||size,
        size
      };
    };
    const update=()=>{
      const variant=['a','b','c'].find(v=>root.classList.contains('featured-anniversary--'+v))||'c';
      // Reset measured values before sampling the browser's current typography.
      root.style.removeProperty('--featured-number-size');
      root.style.removeProperty('--featured-number-shift');
      if(variant==='c')return; // Baseline alignment and shared font size are CSS-owned.
      const labelMetrics=glyph(label);
      const dateMetrics=glyph(dateNode);
      const numberMetrics=glyph(number);
      const labelRect=label.getBoundingClientRect();
      const dateRect=dateNode.getBoundingClientRect();
      // Canvas supplies actual glyph ink extents. Convert them into line-box
      // coordinates: visible heading top and the DATE BASELINE, respectively.
      const visualTop=labelRect.top+(labelMetrics.lineHeight-labelMetrics.ascent-labelMetrics.descent)/2;
      const visualBottom=dateRect.top+(dateMetrics.lineHeight-dateMetrics.ascent-dateMetrics.descent)/2+dateMetrics.ascent;
      const desiredHeight=Math.max(1,visualBottom-visualTop);
      const numberHeight=numberMetrics.ascent+numberMetrics.descent;
      const targetSize=numberMetrics.size*desiredHeight/Math.max(1,numberHeight);
      root.style.setProperty('--featured-number-size',targetSize+'px');
      // Re-measure with the new size to align the top of the actual visible numeral.
      const next=glyph(number);
      const numRect=number.getBoundingClientRect();
      const numVisibleTop=numRect.top+(next.lineHeight-next.ascent-next.descent)/2;
      root.style.setProperty('--featured-number-shift',(visualTop-numVisibleTop)+'px');
    };
    const schedule=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(update)};
    const observer=new ResizeObserver(schedule);
    observer.observe(root);
    observer.observe(details);
    schedule();
    document.fonts?.ready.then(schedule);
    document.fonts?.addEventListener?.('loadingdone',schedule);
    return()=>{
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.fonts?.removeEventListener?.('loadingdone',schedule);
    };
  },[years,text,date,className]);
  return <header ref={rootRef} className={'featured-anniversary '+className}>
    <div className="featured-anniversary__group">
      <span className="featured-anniversary__number">{years}</span>
      <div className="featured-anniversary__details">
        <span className="featured-anniversary__label">{text}</span>
        <div className={'featured-anniversary__date '+dateClassName}>{date}</div>
      </div>
    </div>
  </header>;
}
