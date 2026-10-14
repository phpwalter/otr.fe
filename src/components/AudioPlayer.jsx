import React,{useEffect,useRef,useState} from 'react';

const formatTime=seconds=>Number.isFinite(seconds)?Math.floor(seconds/60)+':'+String(Math.floor(seconds%60)).padStart(2,'0'):'0:00';

/**
 * Shared audio playback component for every radio-series page.
 * Pass an episode with audio_url; radioStyle preserves the X Minus One layout.
 */
export default function AudioPlayer({episode,radioStyle=false}){
  const ref=useRef(null);
  const [playing,setPlaying]=useState(false);
  const [position,setPosition]=useState(0);
  const [duration,setDuration]=useState(0);
  const [muted,setMuted]=useState(false);
  const url=episode?.audio_url;
  const available=Boolean(url);

  useEffect(()=>{
    ref.current?.pause();
    setPlaying(false);
    setPosition(0);
    setDuration(0);
  },[url]);

  const toggle=()=>{
    if(!available||!ref.current)return;
    if(ref.current.paused){
      ref.current.play().catch(()=>setPlaying(false));
    }else{
      ref.current.pause();
    }
  };
  const seek=e=>{
    if(!ref.current||!available)return;
    const next=Number(e.target.value);
    ref.current.currentTime=next;
    setPosition(next);
  };
  const progress=<input type="range" aria-label="Seek" min="0" max={duration||1} step="0.1" value={Math.min(position,duration||1)} onChange={seek} disabled={!available}/>;
  const clock=<time aria-label="Elapsed time and duration">{formatTime(position)} / {formatTime(duration)}</time>;

  return <div className="player audio-player">
    <audio ref={ref} src={url||undefined} preload="metadata" muted={muted}
      onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}
      onEnded={()=>setPlaying(false)} onTimeUpdate={e=>setPosition(e.currentTarget.currentTime)}
      onLoadedMetadata={e=>setDuration(Number.isFinite(e.currentTarget.duration)?e.currentTarget.duration:0)}
    />
    <button type="button" disabled={!available} onClick={toggle} aria-label={playing?'Pause':'Play'}>{playing?'Ⅱ':'▶'}</button>
    {radioStyle?<div className="x1-progress-group">{progress}{clock}</div>:<>{progress}{clock}</>}
    <button type="button" onClick={()=>setMuted(value=>!value)} disabled={!available} aria-label={muted?'Unmute':'Mute'} aria-pressed={muted}>{muted?'🔇':radioStyle?'🔊':'♪'}</button>
  </div>;
}
