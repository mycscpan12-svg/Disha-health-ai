import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════ */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --g-deep:   #0f4c3a;
    --g-mid:    #1a6b52;
    --g-soft:   #2d8f6f;
    --g-light:  #a8d5c2;
    --g-pale:   #d4ede4;
    --cream:    #f5f0e8;
    --cream-dk: #ede7d9;
    --sand:     #c8b89a;
    --warm-wh:  #faf8f4;
    --txt:      #1c1c1e;
    --txt2:     #4a4a4a;
    --muted:    #8a8a8e;
    --saffron:  #e8963a;
    --saff-lt:  #fde8c8;
    --rose:     #c0615f;
    --rose-lt:  #f7dede;
    --blue:     #3b8fd4;
    --purple:   #7b5ea7;
    --nav-h:    68px;
    --safe-b:   env(safe-area-inset-bottom, 0px);
    --r-sm: 8px; --r-md: 14px; --r-lg: 20px; --r-xl: 28px;
    --sh-soft: 0 2px 16px rgba(15,76,58,.08);
    --sh-card: 0 4px 24px rgba(15,76,58,.12);
    --fd: 'Playfair Display', Georgia, serif;
    --fb: 'DM Sans', -apple-system, sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-text-size-adjust: 100%; }
  body { font-family: var(--fb); background: var(--cream); color: var(--txt);
         -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  .app { display: flex; flex-direction: column; min-height: 100vh; max-width: 480px; margin: 0 auto; }
  .screen { flex:1; padding: 0 16px 24px; padding-bottom: calc(var(--nav-h) + var(--safe-b) + 16px);
             overflow-y: auto; min-height: 100vh; }

  /* ── Typography ── */
  .t-xl  { font-family: var(--fd); font-size:32px; font-weight:700; line-height:1.2; }
  .t-lg  { font-family: var(--fd); font-size:24px; font-weight:600; line-height:1.3; }
  .t-md  { font-family: var(--fd); font-size:19px; font-weight:600; line-height:1.4; }
  .t-body{ font-size:15px; line-height:1.65; }
  .t-sm  { font-size:13px; line-height:1.5; }
  .t-xs  { font-size:11px; font-weight:600; letter-spacing:.07em; text-transform:uppercase; }
  .c-green{ color: var(--g-mid); } .c-muted{ color: var(--muted); } .c-white{ color:#fff; }
  .bold  { font-weight:600; }

  /* ── Layout ── */
  .row   { display:flex; align-items:center; }
  .col   { display:flex; flex-direction:column; }
  .jb   { justify-content:space-between; }
  .jc   { justify-content:center; }
  .g4  { gap:4px; }  .g8  { gap:8px; }  .g12 { gap:12px; }
  .g16 { gap:16px; } .g20 { gap:20px; }
  .mt4 { margin-top:4px; }   .mt8  { margin-top:8px; }
  .mt12{ margin-top:12px; }  .mt16 { margin-top:16px; }
  .mt20{ margin-top:20px; }  .mt24 { margin-top:24px; }
  .mb8 { margin-bottom:8px; } .mb12 { margin-bottom:12px; } .mb16 { margin-bottom:16px; }
  .w100{ width:100%; } .tc { text-align:center; }
  .flex1 { flex:1; }

  /* ── Cards ── */
  .card { background:var(--warm-wh); border-radius:var(--r-lg); padding:18px;
          box-shadow:var(--sh-soft); border:1px solid rgba(200,184,154,.2); }
  .card-green { background:linear-gradient(135deg,var(--g-deep),var(--g-mid));
                border:none; color:#fff; }
  .card-saffron{ background:var(--saff-lt); border:1.5px solid #f0c08a; }
  .card-blue  { background:#e8f4fd; border:1.5px solid #aad4f0; }

  /* ── Buttons ── */
  .btn { display:inline-flex; align-items:center; justify-content:center; gap:6px;
         padding:13px 22px; border-radius:var(--r-md); font-family:var(--fb);
         font-size:15px; font-weight:600; cursor:pointer; border:none;
         transition:all .18s ease; -webkit-tap-highlight-color:transparent; }
  .btn:active { transform:scale(.96); }
  .btn-primary { background:linear-gradient(135deg,var(--g-mid),var(--g-deep));
                 color:#fff; box-shadow:0 4px 16px rgba(15,76,58,.28); }
  .btn-primary:hover { box-shadow:0 6px 24px rgba(15,76,58,.38); transform:translateY(-1px); }
  .btn-outline { background:transparent; color:var(--g-mid); border:2px solid var(--g-light); }
  .btn-outline:hover { background:var(--g-pale); }
  .btn-ghost { background:transparent; color:var(--txt2); padding:8px 12px; }
  .btn-sm { padding:9px 16px; font-size:13px; }
  .btn-full { width:100%; }

  /* ── Inputs ── */
  .inp { width:100%; padding:13px 15px; border-radius:var(--r-md); border:2px solid var(--cream-dk);
         background:var(--warm-wh); font-family:var(--fb); font-size:15px; color:var(--txt);
         transition:border-color .2s; outline:none; }
  .inp:focus { border-color:var(--g-soft); }
  .inp::placeholder { color:var(--muted); }
  select.inp { appearance:none; -webkit-appearance:none;
               background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238a8a8e' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
               background-repeat:no-repeat; background-position:right 14px center; padding-right:40px; }
  textarea.inp { resize:vertical; min-height:80px; }
  .inp-label { font-size:12px; font-weight:600; color:var(--txt2); margin-bottom:5px; display:block; }

  /* ── Tags ── */
  .tag { display:inline-flex; align-items:center; padding:3px 10px;
         border-radius:100px; font-size:12px; font-weight:600; }
  .tag-g { background:var(--g-pale); color:var(--g-deep); }
  .tag-s { background:var(--saff-lt); color:#7a4a10; }
  .tag-r { background:var(--rose-lt); color:var(--rose); }
  .tag-b { background:#e8f4fd; color:#1a5d9a; }

  /* ── Bottom Nav ── */
  .nav { position:fixed; bottom:0; left:0; right:0; max-width:480px; margin:0 auto;
         height:calc(var(--nav-h) + var(--safe-b)); padding-bottom:var(--safe-b);
         background:rgba(250,248,244,.96); backdrop-filter:blur(20px);
         -webkit-backdrop-filter:blur(20px); border-top:1px solid rgba(200,184,154,.3);
         display:flex; align-items:flex-start; justify-content:space-around;
         padding-top:8px; z-index:100; box-shadow:0 -4px 20px rgba(15,76,58,.06); }
  .nav-btn { display:flex; flex-direction:column; align-items:center; gap:3px;
             background:none; border:none; cursor:pointer; padding:4px 16px;
             color:var(--muted); transition:color .2s; min-width:60px;
             -webkit-tap-highlight-color:transparent; }
  .nav-btn.active { color:var(--g-mid); }
  .nav-icon { width:38px; height:30px; display:flex; align-items:center; justify-content:center;
              border-radius:10px; transition:background .2s,transform .15s; }
  .nav-btn.active .nav-icon { background:var(--g-pale); transform:translateY(-2px); }
  .nav-lbl { font-size:10px; font-weight:600; letter-spacing:.02em; }

  /* ── Animations ── */
  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse  { 0%,100% { transform:scale(1); } 50% { transform:scale(1.05); } }
  @keyframes spin   { to { transform:rotate(360deg); } }
  @keyframes blink  { 0%,100% { opacity:.3; } 50% { opacity:1; } }
  .anim { animation:fadeUp .38s ease forwards; }
  .anim-1 { animation-delay:.08s; opacity:0; }
  .anim-2 { animation-delay:.16s; opacity:0; }
  .anim-3 { animation-delay:.24s; opacity:0; }

  /* ═══════════ ONBOARDING ═══════════ */
  .ob-wrap { min-height:100vh; background:linear-gradient(160deg,var(--g-pale) 0%,var(--cream) 50%,var(--cream-dk) 100%);
             display:flex; flex-direction:column; padding:20px 24px 40px; max-width:480px; margin:0 auto; }
  .ob-dots { display:flex; gap:6px; justify-content:center; padding:12px 0 20px; }
  .ob-dot  { width:8px; height:8px; border-radius:50%; background:var(--g-light); transition:all .3s; }
  .ob-dot.on { background:var(--g-mid); width:24px; border-radius:4px; }
  .ob-logo-icon { font-size:60px; display:block; animation:pulse 3s ease-in-out infinite; }
  .ob-title { font-family:var(--fd); font-size:44px; font-weight:700; color:var(--g-deep); letter-spacing:-1px; }
  .ob-sub  { color:var(--txt2); margin-top:6px; line-height:1.6; font-size:16px; }
  .ob-features { background:#fff; border-radius:var(--r-lg); padding:18px; display:flex;
                 flex-direction:column; gap:13px; box-shadow:var(--sh-soft); }
  .ob-feat { display:flex; align-items:center; gap:12px; font-size:15px; }
  .ob-dot2 { width:8px; height:8px; background:var(--g-soft); border-radius:50%; flex-shrink:0; }
  .ob-form { display:flex; flex-direction:column; gap:14px; flex:1; }
  .gender-row { display:flex; gap:10px; }
  .gender-btn { flex:1; padding:11px; border-radius:var(--r-md); border:2px solid var(--cream-dk);
                background:var(--warm-wh); font-family:var(--fb); font-size:14px; font-weight:600;
                cursor:pointer; color:var(--txt2); transition:all .2s; }
  .gender-btn.on { border-color:var(--g-soft); background:var(--g-pale); color:var(--g-deep); }
  .bmi-box { background:var(--g-pale); border-radius:var(--r-md); padding:14px 18px;
             display:flex; align-items:center; justify-content:space-between; }
  .bmi-val { font-family:var(--fd); font-size:28px; font-weight:700; color:var(--g-deep); }
  .goals-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .goal-btn { display:flex; flex-direction:column; align-items:center; gap:7px; padding:15px 10px;
              border-radius:var(--r-lg); border:2px solid var(--cream-dk); background:var(--warm-wh);
              cursor:pointer; transition:all .2s; }
  .goal-btn.on { border-color:var(--g-soft); background:var(--g-pale); transform:scale(1.02); }
  .goal-emoji { font-size:26px; }
  .goal-lbl { font-size:12px; font-weight:600; color:var(--txt2); text-align:center; }
  .goal-btn.on .goal-lbl { color:var(--g-deep); }
  .cond-wrap { display:flex; flex-wrap:wrap; gap:9px; }
  .cond-btn { padding:9px 16px; border-radius:100px; border:2px solid var(--cream-dk);
              background:var(--warm-wh); font-family:var(--fb); font-size:13px; font-weight:500;
              cursor:pointer; color:var(--txt2); transition:all .2s; }
  .cond-btn.on { border-color:var(--g-soft); background:var(--g-pale); color:var(--g-deep); font-weight:600; }
  .ob-btns { display:flex; gap:10px; margin-top:auto; padding-top:20px; }
  .ob-btns .btn { flex:1; }

  /* ═══════════ DASHBOARD ═══════════ */
  .dash-hdr { display:flex; align-items:center; justify-content:space-between; padding-top:20px; }
  .dash-avatar { width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,var(--g-mid),var(--g-deep));
                 color:#fff; display:flex; align-items:center; justify-content:center;
                 font-size:18px; font-weight:700; font-family:var(--fd); }
  .goal-card { padding:20px; }
  .goal-icon { font-size:36px; line-height:1; }
  .chat-cta { margin-top:14px; background:rgba(255,255,255,.18); border:1px solid rgba(255,255,255,.35);
              border-radius:var(--r-md); padding:11px 16px; display:flex; align-items:center; gap:8px;
              cursor:pointer; color:#fff; font-family:var(--fb); font-size:14px; font-weight:600;
              width:100%; transition:background .2s; }
  .chat-cta:hover { background:rgba(255,255,255,.28); }
  .stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
  .stat-card { background:var(--warm-wh); border-radius:var(--r-md); padding:12px 8px;
               display:flex; flex-direction:column; align-items:center; gap:4px;
               box-shadow:var(--sh-soft); border:1px solid rgba(200,184,154,.2); }
  .stat-val { font-family:var(--fd); font-size:20px; font-weight:700; line-height:1; }
  .stat-lbl { font-size:10px; font-weight:600; color:var(--muted); text-align:center; letter-spacing:.02em; }
  .stat-sub { font-size:10px; font-weight:600; text-align:center; }
  .tip-card { border-radius:var(--r-lg); padding:16px; background:var(--saff-lt);
              border:1.5px solid #f0c08a; }
  .tip-hdr { display:flex; align-items:center; gap:6px; margin-bottom:10px; }
  .tip-body { display:flex; align-items:flex-start; gap:10px; }
  .tip-emoji { font-size:24px; flex-shrink:0; }
  .ql-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
  .ql-btn  { display:flex; flex-direction:column; align-items:center; gap:6px; padding:14px 8px;
             background:var(--warm-wh); border:2px solid var(--cream-dk); border-radius:var(--r-lg);
             cursor:pointer; transition:all .18s; font-family:var(--fb); }
  .ql-btn:hover { border-color:var(--g-light); background:var(--g-pale); }
  .ql-emoji { font-size:22px; }

  /* ═══════════ CHAT ═══════════ */
  .chat-wrap { display:flex; flex-direction:column; height:calc(100vh - var(--nav-h)); padding:0; }
  .chat-hdr  { padding:16px 16px 12px; border-bottom:1px solid var(--cream-dk); background:var(--warm-wh);
               display:flex; align-items:center; gap:12px; }
  .chat-avatar { width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg,var(--g-mid),var(--g-deep));
                 display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
  .online-dot { width:10px; height:10px; background:#22c55e; border-radius:50%;
                border:2px solid #fff; position:absolute; bottom:1px; right:1px; }
  .chat-msgs { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px;
               scroll-behavior:smooth; }
  .msg { max-width:80%; animation:fadeUp .3s ease; }
  .msg-user { align-self:flex-end; }
  .msg-ai   { align-self:flex-start; }
  .msg-bubble { padding:12px 15px; border-radius:18px; font-size:15px; line-height:1.6; }
  .msg-user .msg-bubble { background:linear-gradient(135deg,var(--g-mid),var(--g-deep)); color:#fff;
                           border-bottom-right-radius:4px; }
  .msg-ai .msg-bubble   { background:var(--warm-wh); color:var(--txt); border:1px solid var(--cream-dk);
                           border-bottom-left-radius:4px; box-shadow:var(--sh-soft); }
  .msg-time { font-size:11px; color:var(--muted); margin-top:3px; padding:0 4px; }
  .msg-user .msg-time { text-align:right; }
  .typing { display:flex; gap:5px; align-items:center; padding:12px 16px; }
  .typing span { width:8px; height:8px; background:var(--g-light); border-radius:50%; animation:blink 1.2s ease infinite; }
  .typing span:nth-child(2) { animation-delay:.2s; }
  .typing span:nth-child(3) { animation-delay:.4s; }
  .chat-input-bar { padding:12px 16px; background:var(--warm-wh); border-top:1px solid var(--cream-dk);
                    padding-bottom:calc(12px + var(--safe-b)); display:flex; gap:10px; align-items:flex-end; }
  .chat-inp { flex:1; padding:12px 15px; border-radius:22px; border:2px solid var(--cream-dk);
              background:var(--cream); font-family:var(--fb); font-size:15px; resize:none;
              max-height:120px; outline:none; transition:border-color .2s; line-height:1.5; }
  .chat-inp:focus { border-color:var(--g-soft); }
  .send-btn { width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,var(--g-mid),var(--g-deep));
              border:none; cursor:pointer; display:flex; align-items:center; justify-content:center;
              flex-shrink:0; transition:all .18s; color:#fff; }
  .send-btn:hover { transform:scale(1.08); }
  .send-btn:disabled { opacity:.4; cursor:not-allowed; transform:none; }
  .quick-prompts { padding:0 16px 10px; display:flex; gap:8px; overflow-x:auto; }
  .quick-prompts::-webkit-scrollbar { display:none; }
  .qp-btn { white-space:nowrap; padding:7px 14px; border-radius:100px; border:1.5px solid var(--g-light);
             background:var(--g-pale); font-family:var(--fb); font-size:12px; font-weight:600;
             color:var(--g-deep); cursor:pointer; transition:all .18s; flex-shrink:0; }
  .qp-btn:hover { background:var(--g-light); }
  .empty-chat { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center;
                gap:8px; padding:32px; text-align:center; }
  .empty-icon { font-size:56px; animation:pulse 3s ease-in-out infinite; }

  /* ═══════════ LOG ═══════════ */
  .log-tabs { display:flex; gap:8px; overflow-x:auto; padding:16px 16px 0; }
  .log-tabs::-webkit-scrollbar { display:none; }
  .log-tab { padding:8px 16px; border-radius:100px; border:1.5px solid var(--cream-dk);
             background:var(--warm-wh); font-family:var(--fb); font-size:13px; font-weight:600;
             color:var(--muted); cursor:pointer; transition:all .18s; white-space:nowrap; }
  .log-tab.on { background:var(--g-deep); color:#fff; border-color:var(--g-deep); }
  .log-form { padding:16px; display:flex; flex-direction:column; gap:12px; }
  .log-entry-list { padding:0 16px 16px; display:flex; flex-direction:column; gap:10px; }
  .log-entry { background:var(--warm-wh); border-radius:var(--r-md); padding:14px;
               display:flex; align-items:center; justify-content:space-between;
               box-shadow:var(--sh-soft); border:1px solid rgba(200,184,154,.2); animation:fadeUp .3s ease; }
  .log-entry-left { display:flex; align-items:center; gap:12px; }
  .log-emoji { font-size:22px; width:40px; height:40px; background:var(--cream); border-radius:10px;
               display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .log-val   { font-family:var(--fd); font-size:22px; font-weight:700; color:var(--g-deep); }
  .del-btn   { background:var(--rose-lt); border:none; border-radius:8px; padding:6px 10px;
               color:var(--rose); cursor:pointer; font-size:13px; font-weight:600; transition:all .18s; }
  .del-btn:hover { background:var(--rose); color:#fff; }
  .sync-btn  { background:var(--g-pale); border:1.5px solid var(--g-light); border-radius:var(--r-md);
               padding:10px 18px; color:var(--g-deep); font-family:var(--fb); font-size:13px;
               font-weight:600; cursor:pointer; display:flex; align-items:center; gap:6px; transition:all .18s; }
  .sync-btn:hover { background:var(--g-light); }
  .sync-ok { color:#22c55e; font-size:12px; font-weight:600; }
  .mood-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:8px; }
  .mood-btn  { padding:10px 4px; border-radius:var(--r-md); border:2px solid var(--cream-dk);
               background:var(--warm-wh); cursor:pointer; display:flex; flex-direction:column;
               align-items:center; gap:3px; font-family:var(--fb); font-size:11px; font-weight:600;
               color:var(--muted); transition:all .2s; }
  .mood-btn.on { border-color:var(--g-soft); background:var(--g-pale); color:var(--g-deep); }
  .mood-emoji { font-size:22px; }

  /* ═══════════ PROFILE ═══════════ */
  .prof-hero { background:linear-gradient(135deg,var(--g-deep),var(--g-mid)); border-radius:var(--r-xl);
               padding:24px; display:flex; flex-direction:column; align-items:center; gap:10px;
               margin-top:20px; }
  .prof-avatar { width:72px; height:72px; border-radius:50%; background:rgba(255,255,255,.2);
                 border:3px solid rgba(255,255,255,.5); display:flex; align-items:center;
                 justify-content:center; font-family:var(--fd); font-size:30px; font-weight:700; color:#fff; }
  .prof-name { font-family:var(--fd); font-size:22px; font-weight:600; color:#fff; }
  .prof-bmi  { background:rgba(255,255,255,.15); border-radius:var(--r-md); padding:12px 24px;
               display:flex; gap:24px; width:100%; justify-content:center; }
  .prof-bmi-item { display:flex; flex-direction:column; align-items:center; gap:2px; }
  .prof-bmi-val  { font-family:var(--fd); font-size:22px; font-weight:700; color:#fff; }
  .prof-bmi-lbl  { font-size:11px; color:rgba(255,255,255,.7); font-weight:600; letter-spacing:.04em; text-transform:uppercase; }
  .prof-section  { margin-top:20px; }
  .prof-fields { display:flex; flex-direction:column; gap:12px; margin-top:14px; }
  .prof-field { display:flex; align-items:center; justify-content:space-between;
                background:var(--warm-wh); border-radius:var(--r-md); padding:14px 16px;
                box-shadow:var(--sh-soft); border:1px solid rgba(200,184,154,.2); }
  .prof-field-key { font-size:13px; font-weight:600; color:var(--muted); }
  .prof-field-val { font-size:15px; font-weight:600; color:var(--txt); }
  .conds-wrap { display:flex; flex-wrap:wrap; gap:8px; margin-top:14px; }
  .sheets-banner { background:var(--card-blue,#e8f4fd); border:1.5px solid #aad4f0;
                   border-radius:var(--r-lg); padding:16px; margin-top:20px; }
  .spinner { width:18px; height:18px; border:2px solid rgba(255,255,255,.4);
             border-top-color:#fff; border-radius:50%; animation:spin .7s linear infinite; display:inline-block; }

  /* scrollbar */
  ::-webkit-scrollbar { width:3px; } ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:var(--g-light); border-radius:4px; }
`;

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS & DATA
═══════════════════════════════════════════════════════════════ */
const GOALS = [
  { id:'weight_loss', emoji:'⚖️', label:'Lose Weight' },
  { id:'fitness',     emoji:'💪', label:'Get Fitter' },
  { id:'diabetes',    emoji:'🩸', label:'Manage Diabetes' },
  { id:'bp',          emoji:'❤️', label:'Control BP' },
  { id:'pcos',        emoji:'🌸', label:'PCOS Support' },
  { id:'stress',      emoji:'🧘', label:'Reduce Stress' },
  { id:'nutrition',   emoji:'🥗', label:'Eat Better' },
  { id:'general',     emoji:'✨', label:'General Wellness' },
];
const GOAL_LABELS = Object.fromEntries(GOALS.map(g => [g.id, g.label]));
const CONDITIONS = ['Diabetes','Hypertension','PCOS','Thyroid','Heart Disease','Asthma','Arthritis','None'];
const TIPS = [
  { e:'🥛', t:'Start your morning with a glass of warm water with lemon to kickstart digestion.' },
  { e:'🚶', t:'A 20-min walk after lunch helps blood sugar levels and digestion — even indoors works!' },
  { e:'🥗', t:'Try to add one extra sabzi (vegetable dish) to your lunch today for more nutrients.' },
  { e:'😴', t:'Try to sleep by 10:30 PM — quality sleep resets hormones and aids weight management.' },
  { e:'🧘', t:'5 minutes of deep breathing (anulom vilom) reduces cortisol and calms the mind.' },
  { e:'💧', t:'Drink 8 glasses of water daily. Set an hourly reminder on your phone!' },
  { e:'🫚', t:'Use mustard or groundnut oil in limited quantity — avoid reheated oil for cooking.' },
  { e:'🌿', t:'Add haldi (turmeric) to your meals daily — it is a powerful natural anti-inflammatory.' },
];
const LOG_TYPES = [
  { id:'water', emoji:'💧', label:'Water',    unit:'glasses', type:'number', placeholder:'e.g. 2', color:'#3b8fd4' },
  { id:'steps', emoji:'🚶', label:'Steps',    unit:'steps',   type:'number', placeholder:'e.g. 3000', color:'#2d8f6f' },
  { id:'sleep', emoji:'😴', label:'Sleep',    unit:'hrs',     type:'number', placeholder:'e.g. 7', color:'#7b5ea7' },
  { id:'weight',emoji:'⚖️', label:'Weight',   unit:'kg',      type:'number', placeholder:'e.g. 74.5', color:'#e8963a' },
  { id:'bp',    emoji:'❤️', label:'BP',       unit:'mmHg',    type:'text',   placeholder:'e.g. 120/80', color:'#c0615f' },
  { id:'sugar', emoji:'🩸', label:'Blood Sugar', unit:'mg/dL', type:'number', placeholder:'e.g. 110', color:'#c0615f' },
  { id:'mood',  emoji:'😊', label:'Mood',     unit:'',        type:'mood',   placeholder:'', color:'#e8963a' },
  { id:'notes', emoji:'📝', label:'Notes',    unit:'',        type:'text-area', placeholder:'How are you feeling today?', color:'#8a8a8e' },
];
const MOODS = [
  { v:'great', e:'😄', l:'Great' }, { v:'good', e:'🙂', l:'Good' },
  { v:'okay',  e:'😐', l:'Okay' }, { v:'tired', e:'😴', l:'Tired' },
  { v:'low',   e:'😞', l:'Low'  },
];
const QUICK_PROMPTS = [
  'What should I eat for breakfast?',
  'Give me a 15-min home workout',
  'Tips for better sleep',
  'How to reduce belly fat?',
  'Good lunch ideas with dal?',
  'How to manage diabetes with diet?',
];

/* ═══════════════════════════════════════════════════════════════
   STORAGE HELPERS
═══════════════════════════════════════════════════════════════ */
function ls(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function lsSet(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

/* ═══════════════════════════════════════════════════════════════
   GOOGLE GEMINI API (FREE — No billing needed)
═══════════════════════════════════════════════════════════════ */
function buildSystem(profile) {
  const bmi = profile.weight && profile.height
    ? (profile.weight / ((profile.height / 100) ** 2)).toFixed(1) : 'unknown';
  return `You are Disha, a warm, knowledgeable, and empathetic AI health coach for Indian users.

USER PROFILE:
- Name: ${profile.name || 'User'}, Age: ${profile.age || 'unknown'}, Gender: ${profile.gender || 'not specified'}
- Weight: ${profile.weight ? profile.weight + ' kg' : 'not provided'}, Height: ${profile.height ? profile.height + ' cm' : 'not provided'}, BMI: ${bmi}
- Goal: ${GOAL_LABELS[profile.goal] || 'General Wellness'}
- Health conditions: ${profile.conditions?.length ? profile.conditions.join(', ') : 'none mentioned'}

YOUR STYLE:
- Speak like a caring, knowledgeable Indian doctor who knows the patient personally
- Use their name naturally. Reference Indian foods (dal, roti, sabzi, chawal, dahi, khichdi, etc.)
- Suggest yoga, pranayama, and walking alongside modern fitness advice
- Be concise and actionable — 2-4 short paragraphs max
- You may occasionally use a Hindi phrase naturally (e.g., "bilkul theek hai", "bahut achha")
- ALWAYS recommend seeing a real doctor for serious symptoms

SCOPE:
- Personalized Indian diet advice, meal planning, healthy food swaps
- Exercise guidance for Indian home/gym settings
- Stress management, sleep hygiene, hydration tips
- Understanding of diabetes, hypertension, PCOS, thyroid, acidity
- Ayurvedic home remedies (clearly label as traditional, not medical advice)

HARD LIMITS:
- Never diagnose or prescribe medications
- For emergencies or serious symptoms, firmly advise seeing a doctor immediately`;
}

async function callAI(messages, profile) {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('API key not set. Please add REACT_APP_GEMINI_API_KEY in Vercel Environment Variables.');
  }

  // Build Gemini contents array — prepend system prompt as first user message
  const systemPrompt = buildSystem(profile);
  const contents = [];

  // Gemini does not have a system role — inject it as first user/model exchange
  contents.push({ role: 'user', parts: [{ text: systemPrompt }] });
  contents.push({ role: 'model', parts: [{ text: 'Understood! I am Disha, your personal Indian health coach. I will follow all the guidelines you have shared. How can I help you today?' }] });

  // Add actual conversation history
  messages.slice(-20).forEach(m => {
    contents.push({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    });
  });

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

/* ═══════════════════════════════════════════════════════════════
   GOOGLE SHEETS SYNC
═══════════════════════════════════════════════════════════════ */
async function syncToSheets(entry) {
  const url = process.env.REACT_APP_SHEETDB_URL;
  if (!url || url.includes('YOUR_SHEETDB')) return false;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [{
        Date: new Date(entry.timestamp).toLocaleDateString('en-IN'),
        Time: new Date(entry.timestamp).toLocaleTimeString('en-IN'),
        Type: entry.type, Value: entry.value, Unit: entry.unit || '', Notes: entry.notes || '',
      }]}),
    });
    return res.ok;
  } catch { return false; }
}

/* ═══════════════════════════════════════════════════════════════
   SVG ICONS (no external deps)
═══════════════════════════════════════════════════════════════ */
const Icon = ({ d, size = 22, stroke = 'currentColor', fill = 'none', sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const HomeIcon   = ({ size, sw }) => <Icon size={size} sw={sw} d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />;
const ChatIcon   = ({ size, sw }) => <Icon size={size} sw={sw} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />;
const LogIcon    = ({ size, sw }) => <Icon size={size} sw={sw} d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4" />;
const UserIcon   = ({ size, sw }) => <Icon size={size} sw={sw} d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />;
const SendIcon   = () => <Icon size={18} fill="white" stroke="white" sw={1} d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />;
const TrashIcon  = () => <Icon size={14} sw={2} d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />;
const SyncIcon   = () => <Icon size={14} sw={2} d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />;
const FlameIcon  = () => <Icon size={14} sw={2} d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />;
const DropIcon   = () => <Icon size={16} sw={2} d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />;
const MoonIcon   = () => <Icon size={16} sw={2} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;
const FootIcon   = () => <Icon size={16} sw={2} d="M19 10c0 3.976-7 13-7 13S5 13.976 5 10a7 7 0 0 1 14 0z" />;
const TrendIcon  = () => <Icon size={16} sw={2} d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />;

/* ═══════════════════════════════════════════════════════════════
   GREETING
═══════════════════════════════════════════════════════════════ */
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Suprabhat 🌅';
  if (h < 17) return 'Namaste 🙏';
  return 'Good evening 🌙';
}

/* ═══════════════════════════════════════════════════════════════
   BMI HELPERS
═══════════════════════════════════════════════════════════════ */
function calcBMI(w, h) { return h ? (w / ((h / 100) ** 2)).toFixed(1) : null; }
function bmiCat(bmi) {
  if (bmi < 18.5) return { label:'Underweight', color:'#e8963a' };
  if (bmi < 25)   return { label:'Normal',      color:'#2d8f6f' };
  if (bmi < 30)   return { label:'Overweight',  color:'#e8963a' };
  return                  { label:'Obese',       color:'#c0615f' };
}

/* ═══════════════════════════════════════════════════════════════
   ONBOARDING
═══════════════════════════════════════════════════════════════ */
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ name:'', age:'', gender:'', weight:'', height:'', goal:'', conditions:[] });
  const s = (k, v) => setF(p => ({ ...p, [k]: v }));
  const toggleCond = c => {
    if (c === 'None') { s('conditions', []); return; }
    s('conditions', f.conditions.includes(c) ? f.conditions.filter(x => x !== c) : [...f.conditions.filter(x => x !== 'None'), c]);
  };
  const bmi = f.weight && f.height ? calcBMI(parseFloat(f.weight), parseFloat(f.height)) : null;

  const steps = [
    /* 0: Welcome */
    <div className="col anim" key="w" style={{ flex:1 }}>
      <div className="col tc" style={{ padding:'32px 0', gap:8 }}>
        <span className="ob-logo-icon">🌿</span>
        <span className="ob-title">Disha</span>
        <p className="ob-sub">Your personal AI health coach,<br/>rooted in Indian wellness</p>
      </div>
      <div className="ob-features">
        {['Personalized diet advice using Indian foods','Yoga, walking & fitness guidance',
          'Manage diabetes, BP, PCOS & more','All data stays on your device — private & secure'].map((t,i) => (
          <div key={i} className="ob-feat"><span className="ob-dot2"/><span>{t}</span></div>
        ))}
      </div>
      <button className="btn btn-primary btn-full mt24" onClick={() => setStep(1)}>Get Started — Free</button>
      <p className="t-sm c-muted tc mt8">No account needed • Works offline</p>
    </div>,

    /* 1: Name & Age */
    <div className="col anim" key="na" style={{ flex:1 }}>
      <p className="t-xs c-muted">Step 1 of 4</p>
      <h2 className="t-lg mt8">Let's get acquainted</h2>
      <p className="t-body c-muted mt8">Disha will personalise your plan</p>
      <div className="ob-form mt20">
        <div><label className="inp-label">Your name</label>
          <input className="inp" placeholder="e.g. Brajesh" value={f.name} onChange={e => s('name', e.target.value)} /></div>
        <div><label className="inp-label">Age</label>
          <input className="inp" type="number" placeholder="e.g. 35" value={f.age} onChange={e => s('age', e.target.value)} /></div>
        <div><label className="inp-label">Gender</label>
          <div className="gender-row">
            {['Male','Female','Other'].map(g => (
              <button key={g} className={`gender-btn${f.gender===g?' on':''}`} onClick={() => s('gender', g)}>{g}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="ob-btns">
        <button className="btn btn-outline" onClick={() => setStep(0)}>← Back</button>
        <button className="btn btn-primary" style={{ opacity: f.name && f.age ? 1 : .45 }}
          onClick={() => f.name && f.age && setStep(2)}>Continue →</button>
      </div>
    </div>,

    /* 2: Stats */
    <div className="col anim" key="st" style={{ flex:1 }}>
      <p className="t-xs c-muted">Step 2 of 4</p>
      <h2 className="t-lg mt8">Your body stats</h2>
      <p className="t-body c-muted mt8">Used to calculate BMI & personalise advice</p>
      <div className="ob-form mt20">
        <div><label className="inp-label">Weight (kg)</label>
          <input className="inp" type="number" placeholder="e.g. 75" value={f.weight} onChange={e => s('weight', e.target.value)} /></div>
        <div><label className="inp-label">Height (cm)</label>
          <input className="inp" type="number" placeholder="e.g. 170" value={f.height} onChange={e => s('height', e.target.value)} /></div>
        {bmi && <div className="bmi-box">
          <div><span className="t-xs c-muted" style={{ display:'block' }}>Your BMI</span>
            <span className="t-sm bold mt4" style={{ display:'block', color: bmiCat(parseFloat(bmi)).color }}>{bmiCat(parseFloat(bmi)).label}</span>
          </div>
          <span className="bmi-val">{bmi}</span>
        </div>}
      </div>
      <div className="ob-btns">
        <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
        <button className="btn btn-primary" onClick={() => setStep(3)}>Continue →</button>
      </div>
    </div>,

    /* 3: Goal */
    <div className="col anim" key="gl" style={{ flex:1 }}>
      <p className="t-xs c-muted">Step 3 of 4</p>
      <h2 className="t-lg mt8">What's your main goal?</h2>
      <div className="goals-grid mt20">
        {GOALS.map(g => (
          <button key={g.id} className={`goal-btn${f.goal===g.id?' on':''}`} onClick={() => s('goal', g.id)}>
            <span className="goal-emoji">{g.emoji}</span>
            <span className="goal-lbl">{g.label}</span>
          </button>
        ))}
      </div>
      <div className="ob-btns">
        <button className="btn btn-outline" onClick={() => setStep(2)}>← Back</button>
        <button className="btn btn-primary" style={{ opacity: f.goal ? 1 : .45 }}
          onClick={() => f.goal && setStep(4)}>Continue →</button>
      </div>
    </div>,

    /* 4: Conditions */
    <div className="col anim" key="co" style={{ flex:1 }}>
      <p className="t-xs c-muted">Step 4 of 4</p>
      <h2 className="t-lg mt8">Any health conditions?</h2>
      <p className="t-body c-muted mt8">Disha will be mindful of these</p>
      <div className="cond-wrap mt20">
        {CONDITIONS.map(c => (
          <button key={c} className={`cond-btn${(f.conditions.includes(c) || (c==='None' && !f.conditions.length))?' on':''}`}
            onClick={() => toggleCond(c)}>{c}</button>
        ))}
      </div>
      <div className="ob-btns">
        <button className="btn btn-outline" onClick={() => setStep(3)}>← Back</button>
        <button className="btn btn-primary" onClick={() => onDone({ ...f, createdAt: new Date().toISOString() })}>
          Meet Disha 🌿
        </button>
      </div>
    </div>,
  ];

  return (
    <div className="ob-wrap">
      <div className="ob-dots">{[0,1,2,3,4].map(i => <span key={i} className={`ob-dot${i<=step?' on':''}`}/>)}</div>
      {steps[step]}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════════ */
function Dashboard({ profile, logs, setTab }) {
  const tip = TIPS[new Date().getDay() % TIPS.length];
  const today = logs.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString());
  const water = today.filter(l => l.type === 'water').reduce((s,l) => s + Number(l.value || 0), 0);
  const steps = today.find(l => l.type === 'steps')?.value || 0;
  const sleep = today.find(l => l.type === 'sleep')?.value || 0;
  const bmi   = profile.weight && profile.height ? parseFloat(calcBMI(parseFloat(profile.weight), parseFloat(profile.height))) : null;
  const cat   = bmi ? bmiCat(bmi) : null;

  return (
    <div className="screen">
      {/* Header */}
      <div className="dash-hdr">
        <div>
          <p className="t-sm c-muted">{greeting()}</p>
          <h1 className="t-lg" style={{ color:'var(--g-deep)', marginTop:2 }}>{profile.name} 👋</h1>
        </div>
        <div className="dash-avatar">{profile.name?.[0]?.toUpperCase() || '?'}</div>
      </div>

      {/* Goal card */}
      <div className="card card-green goal-card mt16 anim">
        <div className="row jb">
          <div>
            <p className="t-xs" style={{ opacity:.75 }}>Your goal</p>
            <p className="t-md mt8" style={{ color:'#fff' }}>{GOAL_LABELS[profile.goal] || 'General Wellness'}</p>
          </div>
          <span className="goal-icon">{GOALS.find(g => g.id === profile.goal)?.emoji || '✨'}</span>
        </div>
        <button className="chat-cta" onClick={() => setTab('chat')}>
          <ChatIcon size={16} sw={2}/> Ask Disha for advice
        </button>
      </div>

      {/* Stats */}
      <div className="stats-row mt16 anim anim-1">
        {bmi && <div className="stat-card">
          <TrendIcon size={16}/>
          <span className="stat-val" style={{ color: cat.color }}>{bmi}</span>
          <span className="stat-lbl">BMI</span>
          <span className="stat-sub" style={{ color: cat.color }}>{cat.label}</span>
        </div>}
        <div className="stat-card">
          <DropIcon size={16}/>
          <span className="stat-val" style={{ color:'#3b8fd4' }}>{water}</span>
          <span className="stat-lbl">Water</span>
          <span className="stat-sub c-muted">glasses</span>
        </div>
        <div className="stat-card">
          <FootIcon size={16}/>
          <span className="stat-val" style={{ color:'#2d8f6f' }}>{steps || 0}</span>
          <span className="stat-lbl">Steps</span>
        </div>
        <div className="stat-card">
          <MoonIcon size={16}/>
          <span className="stat-val" style={{ color:'#7b5ea7' }}>{sleep || 0}</span>
          <span className="stat-lbl">Sleep</span>
          <span className="stat-sub c-muted">hrs</span>
        </div>
      </div>

      {/* Tip */}
      <div className="tip-card mt16 anim anim-2">
        <div className="tip-hdr"><FlameIcon/><span className="t-xs" style={{ color:'#7a4a10' }}>Disha's Tip for Today</span></div>
        <div className="tip-body">
          <span className="tip-emoji">{tip.e}</span>
          <p className="t-body">{tip.t}</p>
        </div>
      </div>

      {/* Quick log */}
      <div className="mt16 anim anim-3">
        <div className="row jb mb12">
          <h2 className="t-md">Quick Log</h2>
          <button className="btn btn-ghost t-sm c-green" onClick={() => setTab('log')}>View all →</button>
        </div>
        <div className="ql-grid">
          {[{e:'💧',l:'Water'},{e:'🚶',l:'Steps'},{e:'😴',l:'Sleep'},{e:'😊',l:'Mood'}].map(it => (
            <button key={it.l} className="ql-btn" onClick={() => setTab('log')}>
              <span className="ql-emoji">{it.e}</span>
              <span className="t-sm c-muted">{it.l}</span>
            </button>
          ))}
        </div>
      </div>

      {today.length > 0 && (
        <div className="row jb mt16" style={{ padding:'12px 16px', background:'var(--warm-wh)', borderRadius:'var(--r-md)' }}>
          <span className="t-sm c-muted">{today.length} log{today.length > 1 ? 's' : ''} today</span>
          <button className="btn btn-ghost btn-sm c-green" onClick={() => setTab('log')}>See details →</button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAT
═══════════════════════════════════════════════════════════════ */
function Chat({ profile }) {
  const [msgs, setMsgs] = useState(() => ls('disha_chat', []));
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const textRef = useRef(null);

  const saveMsgs = m => { const t = m.slice(-60); lsSet('disha_chat', t); return t; };

  const send = useCallback(async (text) => {
    const txt = (text || input).trim();
    if (!txt || loading) return;
    setInput('');
    const userMsg = { role:'user', content:txt, ts: Date.now() };
    const next = saveMsgs([...msgs, userMsg]);
    setMsgs(next);
    setLoading(true);
    try {
      const reply = await callAI(next, profile);
      const aiMsg = { role:'assistant', content:reply, ts: Date.now() };
      setMsgs(saveMsgs([...next, aiMsg]));
    } catch(e) {
      const err = { role:'assistant', content:`⚠️ ${e.message}`, ts: Date.now(), err:true };
      setMsgs(saveMsgs([...next, err]));
    }
    setLoading(false);
  }, [input, loading, msgs, profile]);

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior:'smooth' }), 100);
  }, [msgs, loading]);

  const fmtTime = ts => new Date(ts).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });

  return (
    <div className="chat-wrap">
      {/* Header */}
      <div className="chat-hdr">
        <div style={{ position:'relative' }}>
          <div className="chat-avatar">🌿</div>
          <span className="online-dot"/>
        </div>
        <div className="flex1">
          <p className="bold" style={{ fontSize:16 }}>Disha</p>
          <p className="t-sm c-muted">AI Health Coach • Always here</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => { if(window.confirm('Clear chat history?')) { setMsgs([]); lsSet('disha_chat',[]); } }}>
          <TrashIcon/>
        </button>
      </div>

      {/* Messages */}
      <div className="chat-msgs">
        {msgs.length === 0 ? (
          <div className="empty-chat">
            <span className="empty-icon">🌿</span>
            <p className="t-md" style={{ color:'var(--g-deep)' }}>Namaste, {profile.name}!</p>
            <p className="t-body c-muted">I'm Disha, your personal health coach.<br/>Ask me anything about health, diet, or fitness.</p>
          </div>
        ) : msgs.map((m,i) => (
          <div key={i} className={`msg msg-${m.role === 'user' ? 'user' : 'ai'}`}>
            <div className="msg-bubble" style={m.err ? { borderColor:'#f7dede', background:'#fff5f5' } : {}}>
              {m.content}
            </div>
            <p className="msg-time t-xs c-muted">{fmtTime(m.ts)}</p>
          </div>
        ))}
        {loading && (
          <div className="msg msg-ai">
            <div className="msg-bubble">
              <div className="typing"><span/><span/><span/></div>
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Quick prompts */}
      {msgs.length === 0 && (
        <div className="quick-prompts">
          {QUICK_PROMPTS.map(qp => (
            <button key={qp} className="qp-btn" onClick={() => send(qp)}>{qp}</button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="chat-input-bar">
        <textarea
          ref={textRef}
          className="chat-inp"
          rows={1}
          placeholder="Ask Disha anything…"
          value={input}
          onChange={e => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'; }}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
        />
        <button className="send-btn" disabled={!input.trim() || loading} onClick={() => send()}>
          {loading ? <span className="spinner"/> : <SendIcon/>}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LOG
═══════════════════════════════════════════════════════════════ */
function Log({ logs, addLog, deleteLog }) {
  const [activeType, setActiveType] = useState('water');
  const [val, setVal] = useState('');
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [syncOk, setSyncOk] = useState(false);
  const logType = LOG_TYPES.find(l => l.id === activeType);

  const handleAdd = async () => {
    const value = logType.type === 'mood' ? mood : logType.type === 'text-area' ? note : val;
    if (!value) return;
    const entry = { type: activeType, value, unit: logType.unit, notes: note };
    const added = addLog(entry);
    setVal(''); setMood(''); setNote('');
    setSyncing(true);
    const ok = await syncToSheets(added);
    setSyncing(false);
    if (ok) { setSyncOk(true); setTimeout(() => setSyncOk(false), 3000); }
  };

  const todayLogs = logs.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString());
  const typeLogs = todayLogs.filter(l => l.type === activeType);

  return (
    <div className="screen" style={{ padding:0 }}>
      <div style={{ padding:'20px 16px 0' }}>
        <h1 className="t-lg" style={{ color:'var(--g-deep)' }}>Health Log</h1>
        <p className="t-sm c-muted mt4">Track your daily health metrics</p>
      </div>

      {/* Type tabs */}
      <div className="log-tabs">
        {LOG_TYPES.map(lt => (
          <button key={lt.id} className={`log-tab${activeType===lt.id?' on':''}`} onClick={() => { setActiveType(lt.id); setVal(''); setMood(''); setNote(''); }}>
            {lt.emoji} {lt.label}
          </button>
        ))}
      </div>

      {/* Input form */}
      <div className="log-form">
        <div className="card">
          <div className="row g8 mb12">
            <span style={{ fontSize:28 }}>{logType.emoji}</span>
            <div>
              <p className="bold">{logType.label}</p>
              {logType.unit && <p className="t-sm c-muted">Unit: {logType.unit}</p>}
            </div>
          </div>

          {logType.type === 'mood' ? (
            <div className="mood-grid">
              {MOODS.map(m => (
                <button key={m.v} className={`mood-btn${mood===m.v?' on':''}`} onClick={() => setMood(m.v)}>
                  <span className="mood-emoji">{m.e}</span>{m.l}
                </button>
              ))}
            </div>
          ) : logType.type === 'text-area' ? (
            <textarea className="inp" placeholder={logType.placeholder} value={note} onChange={e => setNote(e.target.value)}/>
          ) : (
            <input className="inp" type={logType.type} placeholder={logType.placeholder}
              value={val} onChange={e => setVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()} />
          )}

          {logType.type !== 'text-area' && logType.type !== 'mood' && (
            <div style={{ marginTop:10 }}>
              <label className="inp-label">Notes (optional)</label>
              <input className="inp" placeholder="Any additional notes…" value={note} onChange={e => setNote(e.target.value)}/>
            </div>
          )}

          <div className="row g8 mt12">
            <button className="btn btn-primary flex1" onClick={handleAdd}>
              {syncing ? <><span className="spinner"/>&nbsp;Saving…</> : '+ Add Log'}
            </button>
            {syncOk && <span className="sync-ok">✓ Synced to Sheets!</span>}
          </div>
        </div>

        {/* Sync button */}
        {process.env.REACT_APP_SHEETDB_URL && !process.env.REACT_APP_SHEETDB_URL.includes('YOUR_SHEETDB') && (
          <div className="row g8">
            <SyncIcon/>
            <span className="t-sm c-muted">Auto-syncing to Google Sheets</span>
          </div>
        )}
      </div>

      {/* Today's entries for this type */}
      {typeLogs.length > 0 && (
        <div>
          <div style={{ padding:'0 16px 8px' }}>
            <p className="t-xs c-muted">Today's {logType.label} logs</p>
          </div>
          <div className="log-entry-list">
            {typeLogs.map(entry => (
              <div key={entry.id} className="log-entry anim">
                <div className="log-entry-left">
                  <div className="log-emoji">{logType.emoji}</div>
                  <div>
                    <span className="log-val" style={{ color: logType.color }}>
                      {entry.value}{entry.unit ? ' ' + entry.unit : ''}
                    </span>
                    {entry.notes && <p className="t-sm c-muted mt4">{entry.notes}</p>}
                    <p className="t-xs c-muted mt4">{new Date(entry.timestamp).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' })}</p>
                  </div>
                </div>
                <button className="del-btn" onClick={() => deleteLog(entry.id)}><TrashIcon/></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {typeLogs.length === 0 && (
        <div className="tc" style={{ padding:'32px 24px', color:'var(--muted)' }}>
          <p style={{ fontSize:40 }}>{logType.emoji}</p>
          <p className="t-body mt12">No {logType.label.toLowerCase()} logged today</p>
          <p className="t-sm mt4">Add your first entry above</p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROFILE
═══════════════════════════════════════════════════════════════ */
function Profile({ profile, updateProfile, resetProfile }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const bmi = profile.weight && profile.height ? calcBMI(parseFloat(profile.weight), parseFloat(profile.height)) : null;
  const cat = bmi ? bmiCat(parseFloat(bmi)) : null;
  const hasSheets = process.env.REACT_APP_SHEETDB_URL && !process.env.REACT_APP_SHEETDB_URL.includes('YOUR_SHEETDB');

  const save = () => { updateProfile(form); setEditing(false); };

  return (
    <div className="screen">
      {/* Hero */}
      <div className="prof-hero anim">
        <div className="prof-avatar">{profile.name?.[0]?.toUpperCase() || '?'}</div>
        <p className="prof-name">{profile.name}</p>
        <span className="tag tag-g">{GOAL_LABELS[profile.goal] || 'Wellness'}</span>
        {bmi && (
          <div className="prof-bmi">
            <div className="prof-bmi-item"><span className="prof-bmi-val">{bmi}</span><span className="prof-bmi-lbl">BMI</span></div>
            <div className="prof-bmi-item"><span className="prof-bmi-val" style={{ color: cat.color, fontSize:16, marginTop:4 }}>{cat.label}</span><span className="prof-bmi-lbl">Status</span></div>
            <div className="prof-bmi-item"><span className="prof-bmi-val">{profile.weight}</span><span className="prof-bmi-lbl">kg</span></div>
            <div className="prof-bmi-item"><span className="prof-bmi-val">{profile.height}</span><span className="prof-bmi-lbl">cm</span></div>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="prof-section anim anim-1">
        <div className="row jb mb12">
          <h2 className="t-md">My Details</h2>
          <button className="btn btn-outline btn-sm" onClick={() => editing ? save() : setEditing(true)}>
            {editing ? '✓ Save' : '✏️ Edit'}
          </button>
        </div>
        {editing ? (
          <div className="col g12">
            {[['Name','name','text'],['Age','age','number'],['Weight (kg)','weight','number'],['Height (cm)','height','number']].map(([lbl,key,tp]) => (
              <div key={key}><label className="inp-label">{lbl}</label>
                <input className="inp" type={tp} value={form[key] || ''} onChange={e => setForm(p => ({...p,[key]:e.target.value}))}/>
              </div>
            ))}
            <div><label className="inp-label">Gender</label>
              <div className="gender-row">
                {['Male','Female','Other'].map(g => (
                  <button key={g} className={`gender-btn${form.gender===g?' on':''}`} onClick={() => setForm(p => ({...p,gender:g}))}>{g}</button>
                ))}
              </div>
            </div>
            <button className="btn btn-outline" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div className="prof-fields">
            {[['Name', profile.name],['Age', profile.age ? profile.age + ' years' : '—'],
              ['Gender', profile.gender || '—'],['Weight', profile.weight ? profile.weight + ' kg' : '—'],
              ['Height', profile.height ? profile.height + ' cm' : '—'],
              ['Member since', profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-IN') : '—']
            ].map(([k,v]) => (
              <div key={k} className="prof-field">
                <span className="prof-field-key">{k}</span>
                <span className="prof-field-val">{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Conditions */}
      {profile.conditions?.length > 0 && (
        <div className="prof-section anim anim-2">
          <h2 className="t-md mb12">Health Conditions</h2>
          <div className="conds-wrap">
            {profile.conditions.map(c => <span key={c} className="tag tag-s">{c}</span>)}
          </div>
        </div>
      )}

      {/* Google Sheets status */}
      <div className="card card-blue mt20 anim anim-2">
        <div className="row g8 mb8">
          <span style={{ fontSize:20 }}>📊</span>
          <p className="bold">Google Sheets Sync</p>
        </div>
        {hasSheets
          ? <p className="t-sm" style={{ color:'#1a5d9a' }}>✓ Connected — your logs sync automatically to Google Sheets.</p>
          : <p className="t-sm" style={{ color:'#1a5d9a' }}>Not configured. Add <code>REACT_APP_SHEETDB_URL</code> to your <code>.env</code> file to enable automatic log syncing to Google Sheets.</p>
        }
      </div>

      {/* API status */}
      <div className="card mt12 anim anim-3">
        <div className="row g8 mb8">
          <span style={{ fontSize:20 }}>🤖</span>
          <p className="bold">AI Status</p>
        </div>
        {process.env.REACT_APP_GEMINI_API_KEY && process.env.REACT_APP_GEMINI_API_KEY !== 'your_gemini_api_key_here'
          ? <p className="t-sm" style={{ color:'var(--g-mid)' }}>✓ Google Gemini (Free) is connected and ready.</p>
          : <p className="t-sm c-muted">Add <code>REACT_APP_GEMINI_API_KEY</code> in Vercel Environment Variables to enable AI chat.</p>
        }
      </div>

      {/* Danger zone */}
      <div className="mt24 anim anim-3" style={{ borderTop:'1px solid var(--cream-dk)', paddingTop:20 }}>
        <p className="t-xs c-muted mb12">Danger Zone</p>
        <button className="btn btn-outline btn-full" style={{ borderColor:'var(--rose)', color:'var(--rose)' }}
          onClick={() => { if(window.confirm('Reset all data? This cannot be undone.')) resetProfile(); }}>
          Reset All Data
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BOTTOM NAV
═══════════════════════════════════════════════════════════════ */
function BottomNav({ tab, setTab }) {
  const items = [
    { id:'home',    Icon:HomeIcon, label:'Home' },
    { id:'chat',    Icon:ChatIcon, label:'Disha' },
    { id:'log',     Icon:LogIcon,  label:'Log' },
    { id:'profile', Icon:UserIcon, label:'Profile' },
  ];
  return (
    <nav className="nav">
      {items.map(({ id, Icon, label }) => (
        <button key={id} className={`nav-btn${tab===id?' active':''}`} onClick={() => setTab(id)}>
          <div className="nav-icon"><Icon size={22} sw={tab===id ? 2.4 : 1.8}/></div>
          <span className="nav-lbl">{label}</span>
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [profile, setProfile] = useState(() => ls('disha_profile', null));
  const [tab, setTab] = useState('home');
  const [logs, setLogs] = useState(() => ls('disha_logs', []));

  const updateProfile = updates => { const p = {...profile, ...updates}; setProfile(p); lsSet('disha_profile', p); };
  const resetProfile  = () => { ['disha_profile','disha_logs','disha_chat'].forEach(k => localStorage.removeItem(k)); setProfile(null); setLogs([]); };
  const addLog = entry => {
    const e = { id: Date.now().toString(), timestamp: new Date().toISOString(), ...entry };
    const next = [e, ...logs];
    setLogs(next); lsSet('disha_logs', next);
    return e;
  };
  const deleteLog = id => { const next = logs.filter(l => l.id !== id); setLogs(next); lsSet('disha_logs', next); };

  const isOnboarded = profile && profile.name;

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        {!isOnboarded ? (
          <Onboarding onDone={data => { setProfile(data); lsSet('disha_profile', data); }} />
        ) : (
          <>
            {tab === 'home'    && <Dashboard profile={profile} logs={logs} setTab={setTab}/>}
            {tab === 'chat'    && <Chat profile={profile}/>}
            {tab === 'log'     && <Log logs={logs} addLog={addLog} deleteLog={deleteLog}/>}
            {tab === 'profile' && <Profile profile={profile} updateProfile={updateProfile} resetProfile={resetProfile}/>}
            <BottomNav tab={tab} setTab={setTab}/>
          </>
        )}
      </div>
    </>
  );
}
