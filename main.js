const state = { data: null, currentView: 'home' };

const viewContainer = document.querySelector('#viewContainer');
const glitchOverlay = document.querySelector('#glitchOverlay');
const toastStack = document.querySelector('#toastStack');
const adminDialog = document.querySelector('#adminDialog');
const adminForm = document.querySelector('#adminForm');
const adminCodeInput = document.querySelector('#adminCode');
const ADMIN_SESSION_KEY = 'mingExeAdminAccess';
const ADMIN_CODE_HASH = 'c28a866fcb5242cdb8df8469b5d97cdb7d3dce3194e04b7aaedc611fa32944f1';
const languageState = { current: localStorage.getItem('mingExeLanguage') || 'es' };
const translations = {
  es: { system:'SISTEMA', home:'INICIO.EXE', about:'SOBRE.DAT', likes:'GUSTOS.DAT', dislikes:'DISGUSTOS.DAT', combat:'COMBATE.SYS', lore:'HISTORIA.LOG', gallery:'GALERIA://', archive:'ARCHIVO', identity:'NUCLEO DE IDENTIDAD', mini:'MINI INFO // AUTOMATICA', energy:'PROTOCOLO DE ENERGIA', quick:'ACCESO RAPIDO', welcome:'BIENVENIDO A MING.EXE // DESBORDAMIENTO DE PERSONALIDAD // HAPPY.EXE ACTIVO // SISTEMA LISTO :3 //', closed:'VENTANA CERRADA // SILENCIO RESTAURADO TEMPORALMENTE', reboot:'REINICIO DE VENTANA // 05:00 MINUTOS', accessDenied:'ACCESO DENEGADO // CODIGO INVALIDO', opening:'ACCESO CONCEDIDO // ABRIENDO PANEL DE CONTROL' },
  en: { system:'SYSTEM', home:'HOME.EXE', about:'ABOUT.DAT', likes:'LIKES.DAT', dislikes:'DISLIKES.DAT', combat:'COMBAT.SYS', lore:'LORE.LOG', gallery:'GALLERY://', archive:'ARCHIVE', identity:'IDENTITY CORE', mini:'MINI INFO // AUTO', energy:'ENERGY PROTOCOL', quick:'QUICK ACCESS', welcome:'WELCOME TO MING.EXE // PERSONALITY OVERFLOW DETECTED // HAPPY.EXE RUNNING // SYSTEM READY :3 //', closed:'WINDOW CLOSED // SILENCE TEMPORARILY RESTORED', reboot:'WINDOW REBOOT // 05:00 MINUTES', accessDenied:'ACCESS DENIED // INVALID CODE', opening:'ACCESS GRANTED // OPENING CONTROL PANEL' },
  ja: { system:'システム', home:'ホーム.EXE', about:'概要.DAT', likes:'好き.DAT', dislikes:'嫌い.DAT', combat:'戦闘.SYS', lore:'記録.LOG', gallery:'ギャラリー://', archive:'アーカイブ', identity:'アイデンティティコア', mini:'ミニ情報 // 自動', energy:'エネルギープロトコル', quick:'クイックアクセス', welcome:'MING.EXEへようこそ // パーソナリティー過負荷 // HAPPY.EXE実行中 // システム準備完了 :3 //', closed:'ウィンドウを閉じました // 一時的に静かになりました', reboot:'ウィンドウ再起動 // 05:00分', accessDenied:'アクセス拒否 // コードが違います', opening:'アクセス許可 // 管理パネルを開きます' },
  zh: { system:'系统', home:'主页.EXE', about:'关于.DAT', likes:'喜欢.DAT', dislikes:'讨厌.DAT', combat:'战斗.SYS', lore:'故事.LOG', gallery:'画廊://', archive:'档案', identity:'身份核心', mini:'迷你信息 // 自动', energy:'能量协议', quick:'快速访问', welcome:'欢迎来到MING.EXE // 个性溢出 // HAPPY.EXE运行中 // 系统准备就绪 :3 //', closed:'窗口已关闭 // 暂时恢复安静', reboot:'窗口重启 // 05:00分钟', accessDenied:'拒绝访问 // 密码错误', opening:'访问成功 // 正在打开控制面板' }
};
const glitchMessages = {
  es: ['ERROR','AQUI TIENES :3','YAY!','HOLA HOLA!!','TODO BIEN','MODO FIESTA','BRILLANDO!','SONRIE!','QUE DIVERTIDO','MING DICE: HOLA','ENERGIA MAXIMA','UPS!','VAMOS!','CORAZONES ONLINE','SISTEMA FELIZ','HEHE','BUENOS DIAS','ABRAZO DIGITAL','CAMBIO RAPIDO','NO TE PIERDAS'],
  en: ['ERROR','HERE YOU GO :3','YAY!','HELLO HELLO!!','ALL GOOD','PARTY MODE','SHINING!','SMILE!','HOW FUN','MING SAYS HI','MAX ENERGY','OOPS!','LET’S GO!','HEARTS ONLINE','HAPPY SYSTEM','HEHE','GOOD MORNING','DIGITAL HUG','QUICK SHIFT','DON’T GET LOST'],
  ja: ['エラー','どうぞ :3','YAY!','こんにちは!!','大丈夫','パーティーモード','キラキラ!','笑って!','楽しいね','MINGよりこんにちは','エネルギー最大','おっと!','行こう!','ハートオンライン','ハッピーシステム','へへ','おはよう','デジタルハグ','高速切替','迷子にならないで'],
  zh: ['错误','给你 :3','YAY!','你好你好!!','一切正常','派对模式','闪闪发光!','笑一个!','真有趣','MING向你问好','能量最大','哎呀!','出发!','爱心在线','快乐系统','嘿嘿','早上好','数字拥抱','快速切换','别迷路']
};
const windowMessages = {
  es: ['¿SIGUES AHI?','MING ESTA MIRANDO','NO CIERRES TODO','ERROR: DEMASIADA ALEGRIA','HAZ CLIC EN ALGO','LA ENERGIA QUIERE ATENCION','RESPIRA. O NO.','ESTO ES COMPLETAMENTE NORMAL','MENSAJE IMPORTANTE: YAY','PINK MODE ACTIVADO','TU SILENCIO FUE REGISTRADO','BRILLO DETECTADO','MING ESTA ESCRIBIENDO...','SISTEMA TE QUIERE','ALERTA DE ABRAZO','COMIDA DULCE NECESARIA','PICANTE DETECTADO','ROBOT DEJA VU','CAMBIO DE MODULO','VUELVE PRONTO'],
  en: ['ARE YOU STILL THERE?','MING IS WATCHING','DO NOT CLOSE EVERYTHING','ERROR: TOO MUCH JOY','CLICK SOMETHING','ENERGY NEEDS ATTENTION','BREATHE. OR DON’T.','THIS IS COMPLETELY NORMAL','IMPORTANT MESSAGE: YAY','PINK MODE ENABLED','YOUR SILENCE WAS LOGGED','BRIGHTNESS DETECTED','MING IS TYPING...','THE SYSTEM LIKES YOU','HUG ALERT','SWEET FOOD REQUIRED','SPICE DETECTED','ROBOT DEJA VU','MODULE SHIFT','COME BACK SOON'],
  ja: ['まだそこにいる?','MINGが見ています','全部閉じないで','エラー: 喜びすぎ','何かをクリックして','エネルギーが注目を要求','呼吸して。しなくてもいい。','これは完全に正常です','重要: YAY','ピンクモード開始','沈黙を記録しました','明るさを検出','MINGが入力中...','システムはあなたが好き','ハグ警報','甘い食べ物が必要','辛さを検出','ロボットの既視感','モジュール変更','また来てね'],
  zh: ['你还在吗?','MING正在看着','不要全部关闭','错误: 快乐过量','点击一些东西','能量需要关注','呼吸。或者不用。','这完全正常','重要消息: YAY','粉色模式开启','已记录你的沉默','检测到亮度','MING正在输入...','系统喜欢你','拥抱警报','需要甜食','检测到辣味','机器人似曾相识','模块切换','下次再来']
};
Object.assign(translations.es, { aboutSub:'CANON ACTUAL // LA VERSION DE MING QUE IMPORTA AHORA', likesSub:'COSAS QUE ENCIENDEN MING.EXE', dislikesSub:'COSAS QUE HACEN QUE EL SISTEMA DIGA NO', combatSub:'TECNICA BUENA // EXPERIENCIA PRACTICA CARGANDO', loreSub:'DATOS ACTUALES Y LEGACY EN ARCHIVOS SEPARADOS', gallerySub:'AÑADE IMAGENES DESPUES // FUENTE DE DATOS LISTA', archiveSub:'ALMACENAMIENTO LEGACY // NO MEZCLAR CANONES' });
Object.assign(translations.en, { aboutSub:'CURRENT CANON // THE VERSION OF MING THAT MATTERS NOW', likesSub:'THINGS THAT LIGHT UP MING.EXE', dislikesSub:'THINGS THAT MAKE THE SYSTEM GO NOPE', combatSub:'TECHNIQUE GOOD // PRACTICAL EXPERIENCE STILL LOADING', loreSub:'CURRENT + LEGACY DATA KEPT IN SEPARATE FILES', gallerySub:'DROP IMAGES HERE LATER // DATA SOURCE READY', archiveSub:'LEGACY DATA STORAGE // DO NOT MIX CANONS' });
Object.assign(translations.ja, { aboutSub:'現在の設定 // 今のMING', likesSub:'MING.EXEを明るくするもの', dislikesSub:'システムが嫌がるもの', combatSub:'技術良好 // 実戦経験を読み込み中', loreSub:'現在とレガシーデータは別ファイル', gallerySub:'画像を後で追加 // データソース準備完了', archiveSub:'レガシーデータ保管庫 // 設定を混ぜない' });
Object.assign(translations.zh, { aboutSub:'当前设定 // 现在的MING', likesSub:'让MING.EXE开心的事', dislikesSub:'让系统说不的事', combatSub:'技术良好 // 实战经验加载中', loreSub:'当前与旧版数据分开保存', gallerySub:'稍后添加图片 // 数据源已准备', archiveSub:'旧版数据存储 // 不要混合设定' });
function t(key) { return translations[languageState.current][key] || translations.en[key] || key; }

function applyLanguage() {
  document.documentElement.lang = languageState.current;
  document.querySelector('#languageSelect').value = languageState.current;
  document.querySelector('#marqueeText').textContent = t('welcome');
  const labels = ['home','about','likes','dislikes','combat','lore','gallery','archive'];
  document.querySelectorAll('.nav-item').forEach((button, index) => { button.textContent = `${['⌂','✦','♡','×','⚔','◈','▣','⌁'][index]} ${t(labels[index])}`; });
  document.querySelector('.top-status').childNodes[1].textContent = ` ${t('system')}: `;
  render(state.currentView, false);
  updateWindowMessages();
}

async function getAdminCodeHash(code) {
  const bytes = new TextEncoder().encode(code);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}

async function requestAdminAccess() {
  adminCodeInput.value = '';
  adminDialog.hidden = false;
  adminCodeInput.focus();
}

async function verifyAdminAccess(event) {
  event.preventDefault();
  if (event.submitter?.value === 'cancel') {
    adminDialog.hidden = true;
    return;
  }
  const code = adminCodeInput.value;
  const valid = await getAdminCodeHash(code) === ADMIN_CODE_HASH;
  adminDialog.hidden = true;
  if (!valid) {
    playGlitch();
    toast('ACCESS DENIED // INVALID CODE');
    return;
  }
  sessionStorage.setItem(ADMIN_SESSION_KEY, 'granted');
  playGlitch();
  toast('ACCESS GRANTED // OPENING CONTROL PANEL');
  setTimeout(() => { window.location.href = 'admin.html'; }, 420);
}

async function loadData() {
  try {
    const saved = localStorage.getItem('mingExeData');
    if (saved) {
      state.data = JSON.parse(saved);
    } else {
      const res = await fetch('data/ming.json', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      state.data = await res.json();
    }
    applyTheme();
    updateShell();
    render('home', false);
    updateRandomLog();
    updateEnergy();
    applyLanguage();
    applyPopupConfig();
  } catch (error) {
    viewContainer.innerHTML = `<section class="panel data-card"><h3>DATA LOAD ERROR</h3><p>${escapeHtml(error.message)}</p><p class="micro">If you opened this with file://, use a local HTTP server so fetch() can read ming.json.</p></section>`;
    toast('DATA ERROR // CHECK LOCAL HTTP SERVER');
  }
}

function applyTheme() {
  const c = state.data.profile.colors;
  Object.entries({ '--pink': c.primary, '--blue': c.secondary, '--cyan': c.accent, '--ink': c.background }).forEach(([k,v]) => document.documentElement.style.setProperty(k, v));
}

function updateShell() {
  const p = state.data.profile;
  document.querySelector('#systemStatus').textContent = p.status;
  document.querySelector('#miniName').textContent = p.name.toUpperCase();
  document.querySelector('#miniMeta').textContent = `${p.age} // ${p.status}`;
  document.querySelector('#avatarCard').textContent = p.name.slice(0,1).toUpperCase();
  const avatarImage = document.querySelector('#avatarImage');
  if (p.avatar) {
    avatarImage.src = p.avatar;
    avatarImage.hidden = false;
    document.querySelector('#avatarCard').hidden = true;
  } else {
    avatarImage.hidden = true;
    document.querySelector('#avatarCard').hidden = false;
  }
}

function render(view, animate = true) {
  state.currentView = view;
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
  if (animate) playGlitch();
  const p = state.data.profile;
  const header = (title, sub) => `<section class="hero panel"><div class="micro">MING.EXE // ${title}</div><h1>${title}</h1><div class="sub">${sub}</div><div class="noise-word">${title}</div></section>`;

  let html = '';
  if (view === 'home') {
    html = `<div class="view">${header('MING.EXE', p.tagline)}
      <section class="panel data-card"><h3>${t('identity')}</h3><div class="profile-list">
        ${row('AGE', p.age)}${row('STATUS', p.status)}${row('MOOD', p.mood)}${row('PRONOUNS', p.pronouns.join(' / '))}${row('IDENTITY', p.identity)}${row('ORIENTATION', p.sexuality)}
      </div></section>
      <section class="panel data-card"><h3>${t('mini')}</h3><p>${escapeHtml(p.description)}</p><div style="margin-top:10px"><span class="badge">EXTROVERTED</span><span class="badge">AFFECTIONATE</span><span class="badge">SPONTANEOUS</span><span class="badge">CHAOTIC</span></div></section>
      <section class="panel data-card"><h3>${t('energy')}</h3>${meter('HAPPINESS',96)}${meter('CURIOSITY',89)}${meter('CHAOS',91)}${meter('SOCIAL POWER',95)}</section>
      <section class="panel data-card"><h3>${t('quick')}</h3><p>Use the navigation like a desktop full of suspicious little files. Every tab glitches into the next one.</p><p class="micro" style="margin-top:12px">Tip: CTRL+K randomizes a window. ⚡ triggers a visual glitch.</p></section>
    </div>`;
  } else if (view === 'about') {
      html = `<div class="view single">${header(t('about'), t('aboutSub'))}</div><div class="panel data-card" style="margin-top:12px"><h3>CORE DESCRIPTION</h3><p>${escapeHtml(p.description)}</p><div class="data-grid" style="margin-top:12px">${card('PERSONALITY','Extroverted, cheerful, vivacious, spontaneous and adaptable. Ming makes friends quickly and can drift into a little mental bubble when distracted.')}${card('AFFECTION','Physical affection is canon. Ming is comfortable expressing warmth directly instead of overthinking it.')}${card('COMBAT','Kickboxing and Muay Thai are his main disciplines; Karate is secondary. Training began around age 7 through private lessons.')}${card('LEGACY','Older ideas can live in the archive without overwriting the current AU canon.')}</div></div>`;
  } else if (view === 'likes' || view === 'dislikes') {
    const arr = view === 'likes' ? state.data.likes : state.data.dislikes;
      html = `<div class="view single">${header(view === 'likes' ? t('likes') : t('dislikes'), view === 'likes' ? t('likesSub') : t('dislikesSub'))}</div><div class="item-grid" style="margin-top:12px">${arr.map(item => itemCard(item)).join('')}</div>`;
  } else if (view === 'combat') {
    html = `<div class="view single">${header(t('combat'), t('combatSub'))}</div><section class="panel data-card" style="margin-top:12px">${state.data.combat.map(c => `<div class="combat-row"><div class="combat-top"><span>${escapeHtml(c.discipline)}</span><span>${c.level}%</span></div><p class="combat-note">${escapeHtml(c.note)}</p><div class="bar-lg"><span style="width:${c.level}%"></span></div></div>`).join('')}</section>`;
  } else if (view === 'lore') {
    html = `<div class="view single">${header(t('lore'), t('loreSub'))}</div><section style="margin-top:12px">${state.data.lore.map(l => `<article class="panel log-entry"><div class="meta">${escapeHtml(l.date)}</div><h3>${escapeHtml(l.title)}</h3><p>${escapeHtml(l.text)}</p></article>`).join('')}</section>`;
  } else if (view === 'gallery') {
    const gallery = state.data.gallery || [];
    html = `<div class="view single">${header(t('gallery'), t('gallerySub'))}</div><section class="panel data-card" style="margin-top:12px">${gallery.length ? `<div class="gallery-grid">${gallery.map(src => `<img src="${escapeAttr(src)}" alt="Ming gallery image">`).join('')}</div>` : `<div class="gallery-empty">NO IMAGES YET // ADD FILE PATHS TO ming.json → gallery[]</div>`}</section>`;
  } else if (view === 'archive') {
    html = `<div class="view single">${header(t('archive'), t('archiveSub'))}</div><section class="panel data-card" style="margin-top:12px"><p>Archive pages are intentionally separate from the current profile. Add old versions, SDA records, concept notes, quotes, or visual references here later.</p><div class="log-entry" style="margin-top:12px"><div class="meta">ARCHIVE RULE</div><h3>CANON LOCK</h3><p>Current AU Ming stays the default. Older versions belong here unless explicitly restored.</p></div></section>`;
  }
  viewContainer.innerHTML = html;
}

function row(label,value){return `<div class="profile-row"><span>${escapeHtml(label)}</span><span>${escapeHtml(String(value))}</span></div>`}
function meter(label,value){return `<div class="meter-row"><div class="label"><span>${label}</span><span>${value}%</span></div><div class="meter"><span style="width:${value}%"></span></div></div>`}
function card(title,text){return `<article class="panel data-card"><h3>${title}</h3><p>${text}</p></article>`}
function itemCard(item){return `<article class="panel item"><div class="icon">${item.icon || '✦'}</div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.note || '')}</p><div class="rate"><div class="micro">AFFINITY ${item.rating}%</div><div class="rate-track"><div class="rate-fill" style="width:${item.rating}%"></div></div></div></article>`}
function escapeHtml(value){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function escapeAttr(value){return escapeHtml(value).replace(/`/g,'&#96;')}

function playGlitch(){
  document.querySelector('#glitchText').textContent = glitchMessages[languageState.current][Math.floor(Math.random() * glitchMessages[languageState.current].length)];
  glitchOverlay.classList.remove('play');
  void glitchOverlay.offsetWidth;
  glitchOverlay.classList.add('play');
}

function toast(message){
  const el=document.createElement('div'); el.className='toast'; el.textContent=message; toastStack.appendChild(el);
  setTimeout(()=>{el.classList.add('out'); setTimeout(()=>el.remove(),300)},2200);
}

function updateClock(){document.querySelector('#clock').textContent=new Date().toLocaleTimeString('en-GB',{hour12:false})}
function updateEnergy(){
  const value = 87 + Math.floor(Math.random()*12);
  document.querySelector('#energyText').textContent = `${value}%`;
  document.querySelector('#energyMeter').style.width = `${value}%`;
}
function updateRandomLog(){
  if (document.querySelector('[data-window-key="log"]')?.dataset.customBody === 'true') return;
  const q=windowMessages[languageState.current] || state.data.quotes || [];
  document.querySelector('#randomLog').textContent=q[Math.floor(Math.random()*q.length)] || '...';
}

function updateWindowMessages(){
  const messages = windowMessages[languageState.current] || windowMessages.en;
  document.querySelectorAll('.float-window:not([data-window-key="energy"]) .win-body').forEach((body, index) => {
    if (body.closest('.float-window').dataset.customBody === 'true') return;
    body.textContent = messages[(Date.now() + index) % messages.length];
  });
  const energyNotice = document.querySelector('[data-window-key="energy"] .tiny');
  if (energyNotice) energyNotice.textContent = languageState.current === 'es' ? 'LA ENERGIA EXIGE ATENCION.' : languageState.current === 'ja' ? 'エネルギーが注目を要求。' : languageState.current === 'zh' ? '能量需要关注。' : 'ENERGY DEMANDS ATTENTION.';
}

function applyPopupConfig(){
  const configs = state.data.popupWindows || [];
  document.querySelectorAll('.float-window[data-window-key]').forEach(windowElement => {
    const config = configs.find(item => item.key === windowElement.dataset.windowKey);
    if (!config) return;
    windowElement.dataset.reopenMinutes = Math.max(1, Number(config.reopenMinutes) || 5);
    const title = windowElement.querySelector('.window-title-text');
    if (title && config.title) title.textContent = config.title;
    const body = windowElement.querySelector('.win-body');
    if (body && config.body && windowElement.dataset.windowKey !== 'energy') {
      body.textContent = config.body;
      windowElement.dataset.customBody = 'true';
    }
  });
}

function bindNav(){
  document.querySelector('#navStack').addEventListener('click', e=>{
    const btn=e.target.closest('.nav-item'); if(!btn) return;
    render(btn.dataset.view);
  });
  document.querySelector('#randomGlitch').addEventListener('click',()=>{playGlitch();toast('GLITCH // MANUAL OVERRIDE');updateRandomLog();updateEnergy()});
  document.querySelector('#adminAccess').addEventListener('click', requestAdminAccess);
  adminForm.addEventListener('submit', verifyAdminAccess);
  document.querySelector('#languageSelect').addEventListener('change', event => {
    languageState.current = event.target.value;
    localStorage.setItem('mingExeLanguage', languageState.current);
    applyLanguage();
    playGlitch();
  });
  document.querySelector('.floating-zone').addEventListener('click', e=>{
    const close = e.target.closest('.close-fake');
    if (!close) return;
    const windowElement = close.closest('.float-window');
    if (!windowElement) return;
    windowElement.classList.add('window-closing');
    setTimeout(() => {
      windowElement.classList.remove('window-closing');
      windowElement.classList.add('window-hidden');
      toast(t('reboot'));
      const minutes = Number(windowElement.dataset.reopenMinutes) || 5;
      setTimeout(() => windowElement.classList.remove('window-hidden'), minutes * 60000);
    }, 180);
    toast(t('closed'));
  });
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();playGlitch();updateRandomLog();toast('RANDOM WINDOW:// SHIFTED')}
  });
}

function initCursor(){
  const glow=document.querySelector('#cursorGlow');
  window.addEventListener('pointermove',e=>{glow.style.transform=`translate(${e.clientX}px,${e.clientY}px)`});
}

function initParticles(){
  const canvas=document.querySelector('#particleCanvas'),ctx=canvas.getContext('2d');
  let particles=[];
  function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);particles=Array.from({length:Math.min(95,Math.floor(innerWidth/14))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,s:Math.random()*1.5+.5}))}
  function tick(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of particles){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=innerWidth;if(p.x>innerWidth)p.x=0;if(p.y<0)p.y=innerHeight;if(p.y>innerHeight)p.y=0;ctx.fillStyle=Math.random()>.5?'rgba(255,20,147,.5)':'rgba(141,216,255,.45)';ctx.fillRect(p.x,p.y,p.s,p.s)}}
  resize();addEventListener('resize',resize);setInterval(tick,50)
}

bindNav();initCursor();initParticles();setInterval(updateClock,1000);updateClock();setInterval(updateEnergy,5000);setInterval(updateRandomLog,4200);setInterval(updateWindowMessages,4200);loadData();
