/* FREEDOM SYSTEM - logica compartida por todas las paginas.
   Extraido de index.html. Incluye la pasarela de pago entera: el modal
   se inyecta desde aqui para que exista una sola copia del marcado.

   Se carga al final del <body>, asi que el DOM ya esta listo. */

/* ─── Marcado del modal de pago ───────────────────────────── */
if (!document.getElementById('payModal')) {
  const hueco = document.createElement('div');
  hueco.innerHTML = `
<!-- ── CHECKOUT · PASARELA DE PAGO ────────────────────────── -->
<div class="pay-overlay" id="payModal" role="dialog" aria-modal="true" aria-labelledby="payBoxTitle">
  <div class="pay-box">
    <button class="pay-close" onclick="closePay()" aria-label="Cerrar">✕</button>

    <div class="pay-box-header">
      <div class="pay-box-logo">⬡ FREEDOM SYSTEM</div>
      <div class="pay-box-title" id="payBoxTitle">// checkout seguro · acceso en &lt;24h</div>
    </div>

    <!-- Selector de plan -->
    <div class="pay-plans">
      <div class="pay-plan" id="payPlan-academia" onclick="payPlan('academia')">
        <div class="pay-plan-name">La Academia</div>
        <div class="pay-plan-price">$299 · pago único</div>
      </div>
      <div class="pay-plan active" id="payPlan-base" onclick="payPlan('base')">
        <div class="pay-plan-name">Comunidad</div>
        <div class="pay-plan-price">$50/mes · sin permanencia</div>
      </div>
    </div>

    <!-- Importe -->
    <div class="pay-amount">
      <div class="pay-amount-usd"><span class="curr">$</span><span id="payUsd">50</span></div>
      <div class="pay-amount-conv" id="payConv">≈ <strong>Bs 151.180,02</strong></div>
      <div class="pay-rate-note" id="payRateNote"><span class="live-dot"></span>Consultando la tasa del día…</div>
    </div>

    <!-- Tabs -->
    <div class="pay-tabs">
      <button class="pay-tab active" data-tab="ves" onclick="payTab('ves')">
        <span class="ico" style="font-family:var(--font-display);">Bs</span> Bolívares
      </button>
      <button class="pay-tab" data-tab="cripto" onclick="payTab('cripto')">
        <span class="ico">₮</span> Cripto
      </button>
      <button class="pay-tab" data-tab="tarjeta" onclick="payTab('tarjeta')">
        <span class="ico">💳</span> Tarjeta
      </button>
    </div>

    <!-- ─── PANEL BOLÍVARES ─── -->
    <div class="pay-panel active" data-panel="ves">
      <div class="pay-row highlight">
        <div class="pay-row-label">Monto exacto</div>
        <div class="pay-row-value" id="vesAmount">Bs 151.180,02</div>
        <button class="pay-copy" onclick="payCopy(this,'vesAmountRaw')">COPIAR</button>
        <span id="vesAmountRaw" style="display:none;">151180.02</span>
      </div>
      <div class="pay-row">
        <div class="pay-row-label">Banco</div>
        <div class="pay-row-value" id="vesBanco">—</div>
      </div>
      <div class="pay-row">
        <div class="pay-row-label">Teléfono</div>
        <div class="pay-row-value" id="vesTelefono">—</div>
        <button class="pay-copy" onclick="payCopy(this,'vesTelefono')">COPIAR</button>
      </div>
      <div class="pay-row">
        <div class="pay-row-label">Cédula / RIF</div>
        <div class="pay-row-value" id="vesCedula">—</div>
        <button class="pay-copy" onclick="payCopy(this,'vesCedula')">COPIAR</button>
      </div>
      <div class="pay-row">
        <div class="pay-row-label">Titular</div>
        <div class="pay-row-value" id="vesTitular">—</div>
      </div>
      <div class="pay-row" id="vesCuentaRow">
        <div class="pay-row-label">Cuenta</div>
        <div class="pay-row-value" id="vesCuenta">—</div>
        <button class="pay-copy" onclick="payCopy(this,'vesCuenta')">COPIAR</button>
      </div>

      <div class="pay-steps">
        <div class="pay-steps-title">// cómo completar el pago</div>
        <div class="pay-step"><span class="pay-step-num">1</span>Haz el <strong>Pago Móvil</strong> por el monto exacto en bolívares indicado arriba.</div>
        <div class="pay-step"><span class="pay-step-num">2</span>Guarda el <strong>número de referencia</strong> que te da tu banco.</div>
        <div class="pay-step"><span class="pay-step-num">3</span>Rellena tus datos aquí abajo y pulsa el botón: se abre WhatsApp con todo listo.</div>
        <div class="pay-step"><span class="pay-step-num">4</span>Verificamos el pago y te enviamos tus accesos en menos de 24 horas.</div>
      </div>

      <div class="pay-fields">
        <div class="pay-field">
          <label for="vesName">Nombre y apellido</label>
          <input class="pay-input" type="text" id="vesName" placeholder="Tu nombre">
        </div>
        <div class="pay-field">
          <label for="vesRef">N.º de referencia</label>
          <input class="pay-input" type="text" id="vesRef" placeholder="Últimos 6 dígitos">
        </div>
        <div class="pay-field full">
          <label for="vesEmail">Correo para tus accesos</label>
          <input class="pay-input" type="email" id="vesEmail" placeholder="tucorreo@email.com">
        </div>
      </div>

      <button class="btn-wa" onclick="payConfirm('ves')">
        <span style="font-size:18px;">💬</span> Enviar comprobante por WhatsApp →
      </button>
      <a class="pay-alt-btn" id="vesAltBtn" href="#" target="_blank" rel="noopener">O envíalo por Instagram DM</a>
    </div>

    <!-- ─── PANEL CRIPTO ─── -->
    <div class="pay-panel" data-panel="cripto">
      <div class="pay-nets" id="payNets"></div>

      <div class="pay-qr"><img id="payQr" src="" alt="Código QR de la dirección de pago" onerror="this.style.display='none'"></div>

      <div class="pay-row highlight" style="border-color:rgba(38,161,123,0.45);background:rgba(38,161,123,0.05);">
        <div class="pay-row-label">A enviar</div>
        <div class="pay-row-value" id="cryptoAmount" style="color:#26a17b;">300 USDT</div>
        <button class="pay-copy" onclick="payCopy(this,'cryptoAmountRaw')">COPIAR</button>
        <span id="cryptoAmountRaw" style="display:none;">300</span>
      </div>
      <div class="pay-row">
        <div class="pay-row-label">Red</div>
        <div class="pay-row-value" id="cryptoNet">—</div>
      </div>
      <div class="pay-row">
        <div class="pay-row-label">Dirección</div>
        <div class="pay-row-value" id="cryptoAddr">—</div>
        <button class="pay-copy" onclick="payCopy(this,'cryptoAddr')">COPIAR</button>
      </div>

      <div class="pay-warn" id="cryptoWarn">⚠️ Envía solo por la red seleccionada. Un envío por la red equivocada se pierde y no es recuperable.</div>

      <div class="pay-steps">
        <div class="pay-steps-title">// cómo completar el pago</div>
        <div class="pay-step"><span class="pay-step-num">1</span>Copia la dirección o escanea el QR desde tu wallet (Binance, Bybit, Trust Wallet…).</div>
        <div class="pay-step"><span class="pay-step-num">2</span>Envía el importe exacto por la <strong>red indicada</strong>. Las comisiones de red las cubre quien envía.</div>
        <div class="pay-step"><span class="pay-step-num">3</span>Copia el <strong>hash / TXID</strong> de la transacción.</div>
        <div class="pay-step"><span class="pay-step-num">4</span>Rellena tus datos y confírmanos por WhatsApp. Accesos en menos de 24 horas.</div>
      </div>

      <div class="pay-fields">
        <div class="pay-field">
          <label for="cryptoName">Nombre y apellido</label>
          <input class="pay-input" type="text" id="cryptoName" placeholder="Tu nombre">
        </div>
        <div class="pay-field">
          <label for="cryptoTx">Hash / TXID</label>
          <input class="pay-input" type="text" id="cryptoTx" placeholder="Opcional">
        </div>
        <div class="pay-field full">
          <label for="cryptoEmail">Correo para tus accesos</label>
          <input class="pay-input" type="email" id="cryptoEmail" placeholder="tucorreo@email.com">
        </div>
      </div>

      <button class="btn-wa" onclick="payConfirm('cripto')">
        <span style="font-size:18px;">💬</span> Confirmar pago por WhatsApp →
      </button>
      <a class="pay-alt-btn" id="cryptoAltBtn" href="#" target="_blank" rel="noopener">O envíalo por Instagram DM</a>
    </div>

    <!-- ─── PANEL TARJETA ─── -->
    <div class="pay-panel" data-panel="tarjeta">

      <!-- Se muestra cuando SÍ hay enlace de pago configurado -->
      <div id="cardReady" style="display:none;">
        <div class="pay-steps">
          <div class="pay-steps-title">// pago con tarjeta</div>
          <div class="pay-step"><span class="pay-step-num">1</span>Pulsa el botón: se abre el checkout seguro del proveedor de pago.</div>
          <div class="pay-step"><span class="pay-step-num">2</span>Introduce ahí los datos de tu tarjeta. <strong>Nunca pasan por esta página.</strong></div>
          <div class="pay-step"><span class="pay-step-num">3</span>Al confirmarse el cobro recibes tus accesos por correo.</div>
        </div>
        <div class="pay-fields">
          <div class="pay-field full">
            <label for="cardEmail">Correo para tus accesos</label>
            <input class="pay-input" type="email" id="cardEmail" placeholder="tucorreo@email.com">
          </div>
        </div>
        <a class="btn-card-pay" id="cardPayBtn" href="#" target="_blank" rel="noopener">
          <span style="font-size:17px;">💳</span> Pagar con tarjeta — <span id="cardBtnAmount">$50</span> →
        </a>
        <div class="pay-foot" style="border:none;padding-top:10px;margin-top:8px;">
          Visa · Mastercard · American Express · 3-D Secure
        </div>
      </div>

      <!-- Se muestra mientras NO haya enlace de pago configurado -->
      <div id="cardPending">
        <div class="pay-steps">
          <div class="pay-steps-title">// pago con tarjeta</div>
          <div class="pay-step"><span class="pay-step-num">1</span>Escríbenos con tus datos y te enviamos un <strong>enlace de pago seguro</strong> personalizado.</div>
          <div class="pay-step"><span class="pay-step-num">2</span>Pagas con Visa, Mastercard o Amex desde el enlace. Tus datos van cifrados al proveedor.</div>
          <div class="pay-step"><span class="pay-step-num">3</span>Confirmado el cobro, recibes tus accesos por correo.</div>
        </div>
        <div class="pay-fields">
          <div class="pay-field">
            <label for="cardName">Nombre y apellido</label>
            <input class="pay-input" type="text" id="cardName" placeholder="Tu nombre">
          </div>
          <div class="pay-field">
            <label for="cardCountry">País</label>
            <input class="pay-input" type="text" id="cardCountry" placeholder="Venezuela, España…">
          </div>
          <div class="pay-field full">
            <label for="cardEmail2">Correo para tus accesos</label>
            <input class="pay-input" type="email" id="cardEmail2" placeholder="tucorreo@email.com">
          </div>
        </div>
        <button class="btn-wa" onclick="payConfirm('tarjeta')">
          <span style="font-size:18px;">💬</span> Solicitar enlace de pago →
        </button>
        <a class="pay-alt-btn" id="cardAltBtn" href="#" target="_blank" rel="noopener">O escríbenos por Instagram DM</a>
      </div>

    </div>

    <div class="pay-foot">
      <div class="pay-secure"><span>🔒</span> Pago verificado por el equipo de Freedom System</div>
      Nunca pedimos claves, PIN ni códigos de tu banco · Programa formativo, el trading conlleva riesgo
    </div>

  </div>
</div>
`;
  while (hueco.firstChild) document.body.appendChild(hueco.firstChild);
}

document.documentElement.classList.add('js');
/* ─── Matrix rain ─────────────────────────────────── */
(function(){
  const c = document.getElementById('matrix-canvas');
  const ctx = c.getContext('2d');
  function resize(){ c.width = window.innerWidth; c.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>[]{}|/\\';
  const fontSize = 14; let cols, drops;
  function init(){
    cols = Math.floor(c.width / fontSize);
    drops = Array(cols).fill(1);
  }
  init(); window.addEventListener('resize', init);
  setInterval(() => {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px DM Mono, monospace';
    drops.forEach((y,i) => {
      const ch = chars[Math.floor(Math.random()*chars.length)];
      ctx.fillText(ch, i*fontSize, y*fontSize);
      if(y*fontSize > c.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 60);
})();

document.addEventListener('DOMContentLoaded', function() {

/* ─── Reveal on scroll ────────────────────────────────────────
   Ya no hay observer: el revelado lo lleva el CSS con
   `animation-timeline: view()`. Ver el bloque REVELADO del <style>. */

/* ─── FAQ ─────────────────────────────────────────── */
function toggleFaq(el){
  const item = el.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
  if(!wasOpen) item.classList.add('open');
}
window.toggleFaq = toggleFaq;

/* ═══════════════════════════════════════════════════════════
   PASARELA DE PAGO · Bolívares · Cripto · Tarjeta
   ───────────────────────────────────────────────────────────
   ⚙️  EDITA SOLO ESTE BLOQUE PAY_CONFIG CON TUS DATOS REALES.
       Todo lo demás funciona solo.
   ═══════════════════════════════════════════════════════════ */
const PAY_CONFIG = {

  /* ── Contacto para confirmar los pagos ────────────────── */
  whatsapp:  '584242505307',          // 0424-250-5307 en formato internacional, SIN + ni espacios
  instagram: 'infantebest',           // usuario sin @  (deja '' para ocultar el botón)
  telegram:  '',                      // usuario o grupo sin @ (deja '' para ocultar el enlace del pie)
  email:     'ownthewar@gmail.com',   // respaldo: solo se usa si whatsapp queda vacio

  /* ── Planes ───────────────────────────────────────────── */
  plans: {
    /* La academia y la comunidad se cobran por aquí. El curso oficial y la
       mentoría todavía no: sus botones abren la lista de espera por WhatsApp. */
    academia: { name: 'La Academia', usd: 299, note: 'pago único · 50 plazas' },
    base:     { name: 'Comunidad',   usd: 50,  note: 'suscripción mensual' },
    mensual:  { name: 'Comunidad',   usd: 50,  note: 'suscripción mensual' }
  },

  /* ── Bolívares · Pago Móvil / transferencia ───────────── */
  ves: {
    banco:    'Banco de Venezuela · 0102',
    telefono: '0412-0288992',
    cedula:   'V-27.967.297',
    titular:  'Francisco Infante',
    cuenta:   '',                           // vacio = solo Pago Movil; la fila de
                                            // transferencia se oculta sola
    rate:     1002.95,                      // respaldo final (paralelo del 25/10/2026). Solo se usa si
                                            // falla la consulta Y el visitante no tiene ninguna tasa guardada
    autoRate: true,                         // true = consulta la tasa cada vez que se abre el checkout
    // Tasa del mercado paralelo. Devuelve { promedio, fechaActualizacion, ... }
    // y permite CORS, que es lo que hace falta para pedirla desde el navegador.
    //
    // OJO: aqui estaba 'https://criptoya.com/api/binancep2p/usdt/ves/1', que es
    // la tasa Binance P2P. El 25/10/2026 ese servicio empezo a responder 403
    // (bloqueo de Cloudflare) tanto desde el navegador como desde consola, asi
    // que el sitio llevaba dias cobrando con el valor de respaldo. El paralelo
    // de dolarapi sigue a menos del 1% de la de Binance y se actualiza varias
    // veces al dia. Si criptoya revive, se puede volver: el parser acepta las
    // dos formas de respuesta.
    rateApi:  'https://ve.dolarapi.com/v1/dolares/paralelo'
  },

  /* ── Criptomonedas ────────────────────────────────────── */
  crypto: {
    nets: [
      { id:'trc20',   label:'USDT · TRC20',  ticker:'USDT', stable:true,
        net:'TRON (TRC20)',            address:'TLFmCCDYo9Y6VHsazerxjwUo6Zz77asHjk',
        warn:'Envía solo USDT por la red TRON (TRC20). Otra red = fondos perdidos.' },

      /* Para aceptar USDT por BEP20 hace falta una direccion de BNB Smart
         Chain (empieza por 0x). La de TRON NO sirve en esa red, asi que la
         opcion se retira hasta tenerla, en vez de enseñar una falsa. */

      { id:'binance', label:'Binance Pay',   ticker:'USDT', stable:true,
        net:'Binance Pay ID',          address:'1075731878',
        warn:'Envía desde tu app de Binance usando el Pay ID. Transferencia interna sin comisión.' },

      { id:'btc',     label:'Bitcoin',       ticker:'BTC',  stable:false,
        net:'Bitcoin (BTC)',           address:'14YTsb1o6biz9h24WATo7GcUCwpeZHkfEJ',
        warn:'Envía el equivalente en BTC al cambio del momento, red Bitcoin. Confirmaciones: 10–40 min.' }
    ]
  },

  /* ── Tarjeta ──────────────────────────────────────────── */
  card: {
    // Pega aquí tu enlace de pago (Stripe Payment Link, PayPal.me, Binance Pay,
    // Payoneer, Mercado Pago…). Mientras esté vacío se muestra el flujo de
    // "solicitar enlace de pago" por WhatsApp, que ya funciona.
    links: {
      base:    '',
      mensual: ''
    }
  }
};
/* ═══════ FIN DE LA CONFIGURACIÓN ═══════════════════════════ */

/* Soporte: el enlace ya viene escrito en el HTML (asi funciona sin
   JavaScript), pero si el script corre se rehace desde PAY_CONFIG para
   que el numero viva en un solo sitio. */
(function () {
  const apply = () => {
    const wa = document.getElementById('soporteWa');
    const ig = document.getElementById('soporteIg');
    if (wa && PAY_CONFIG.whatsapp) {
      wa.href = 'https://wa.me/' + PAY_CONFIG.whatsapp + '?text=' +
                encodeURIComponent('Hola, tengo una duda sobre Freedom System.');
    }
    const user = (PAY_CONFIG.instagram || '').trim().replace(/^@/, '');
    if (ig) {
      if (user && user.indexOf('tu_') !== 0) ig.href = 'https://instagram.com/' + user;
      else ig.style.display = 'none';
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();

/* Enlaces sociales del pie de página: se rellenan desde PAY_CONFIG.
   Si el usuario está vacío, el enlace se oculta en lugar de quedar muerto. */
(function () {
  const social = [
    { item: 'footIgItem', link: 'footIg', user: PAY_CONFIG.instagram, base: 'https://instagram.com/' },
    { item: 'footTgItem', link: 'footTg', user: PAY_CONFIG.telegram,  base: 'https://t.me/'          }
  ];
  const apply = () => social.forEach(s => {
    const li = document.getElementById(s.item);
    const a  = document.getElementById(s.link);
    if (!li || !a) return;
    const user = (s.user || '').trim().replace(/^@/, '');
    if (user && user.indexOf('tu_') !== 0) { a.href = s.base + user; }
    else { li.style.display = 'none'; }
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();


const payState = {
  plan: 'base',
  tab:  'ves',
  net:  PAY_CONFIG.crypto.nets[0].id,
  rate: PAY_CONFIG.ves.rate,
  rateLabel: 'de referencia'   // el texto ya empieza por "Tasa ", no lo repitas aqui
};

function payPlanData()  { return PAY_CONFIG.plans[payState.plan] || PAY_CONFIG.plans.base; }
function payNetData()   { return PAY_CONFIG.crypto.nets.find(n => n.id === payState.net) || PAY_CONFIG.crypto.nets[0]; }
function payFmtVes(n)   { return 'Bs ' + n.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function paySet(id, txt) { const el = document.getElementById(id); if (el) el.textContent = txt; }

/* ─── Tasa del mercado paralelo ─────────────────────────────
   Se consulta al cargar la pagina y cada vez que se abre el checkout. A
   diferencia de la del BCV, que cambia una vez al dia, esta se mueve
   durante la jornada: por eso la etiqueta muestra tambien la hora.

   La ultima tasa buena queda guardada en el navegador del visitante. Si algun
   dia el servicio no responde, se usa esa en lugar del valor de respaldo del
   config, que envejece en cuanto pasan unas semanas sin tocarlo. Orden de
   preferencia: tasa del dia → ultima tasa conocida → respaldo del config. */
const RATE_CACHE = 'fs_rate_paralelo';   // clave nueva a proposito: si no, a
                                         // quien tuviera guardada una tasa
                                         // Binance vieja se le reutilizaria
const rateStore = {
  get()  { try { return JSON.parse(localStorage.getItem(RATE_CACHE) || 'null'); } catch (e) { return null; } },
  set(o) { try { localStorage.setItem(RATE_CACHE, JSON.stringify(o)); } catch (e) {} }
};

function payApplyRate(value, fechaISO) {
  const v = Number(value);
  if (!isFinite(v) || v <= 0) return false;
  payState.rate = v;
  const f = fechaISO ? new Date(fechaISO) : null;
  payState.rateLabel = (f && !isNaN(f))
    ? 'paralelo · ' + f.toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit' }) +
      ' ' + f.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })
    : 'del mercado paralelo';
  payRefresh();
  return true;
}

function payFetchRate() {
  const cfg = PAY_CONFIG.ves;
  if (!cfg.autoRate || !cfg.rateApi) return;

  /* 1 · Pintar de inmediato la ultima tasa conocida, para no mostrar nunca el
        valor de respaldo si ya hubo una consulta buena antes. */
  const cached = rateStore.get();
  if (cached) payApplyRate(cached.v, cached.d);

  /* 2 · Pedir la tasa del dia y actualizar si llega. */
  fetch(cfg.rateApi, { cache: 'no-store' })
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(d => {
      /* criptoya devuelve ask/bid; dolarapi, promedio/venta. Se aceptan las dos
         formas para que cambiar de fuente sea solo tocar rateApi. Se usa el ASK,
         que es lo que cuesta comprar USDT con bolivares. */
      const v = Number(d.ask ?? d.totalAsk ?? d.bid ?? d.promedio ?? d.venta ?? d.compra ?? d.price);
      const fecha = d.time ? new Date(d.time * 1000).toISOString() : (d.fechaActualizacion || null);
      if (payApplyRate(v, fecha)) {
        rateStore.set({ v: v, d: fecha, t: Date.now() });
      }
    })
    .catch(() => { /* queda la tasa cacheada o, en su defecto, la del config */ });
}

/* ─── Redes cripto ────────────────────────────────────────── */
function payRenderNets() {
  const wrap = document.getElementById('payNets');
  if (!wrap) return;
  wrap.innerHTML = '';
  PAY_CONFIG.crypto.nets.forEach(n => {
    const b = document.createElement('button');
    b.className = 'pay-net' + (n.id === payState.net ? ' active' : '');
    b.textContent = n.label;
    b.onclick = () => { payState.net = n.id; payRenderNets(); payRefresh(); };
    wrap.appendChild(b);
  });
}

/* ─── Refresco de importes y datos ────────────────────────── */
function payRefresh() {
  const plan = payPlanData();
  const usd  = plan.usd;

  paySet('payUsd', usd);

  /* Bolívares */
  const bs = usd * payState.rate;
  const conv = document.getElementById('payConv');
  if (conv) conv.innerHTML = '≈ <strong>' + payFmtVes(bs) + '</strong>';
  paySet('payRateNote', 'Tasa ' + payState.rateLabel + ' · Bs ' +
    payState.rate.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' por $1');
  paySet('vesAmount', payFmtVes(bs));
  paySet('vesAmountRaw', bs.toFixed(2).replace('.', ','));

  const v = PAY_CONFIG.ves;
  paySet('vesBanco', v.banco);
  paySet('vesTelefono', v.telefono);
  paySet('vesCedula', v.cedula);
  paySet('vesTitular', v.titular);
  paySet('vesCuenta', v.cuenta);
  const cuentaRow = document.getElementById('vesCuentaRow');
  if (cuentaRow) cuentaRow.style.display = v.cuenta ? '' : 'none';

  /* Cripto */
  const n = payNetData();
  paySet('cryptoAmount', n.stable ? usd + ' ' + n.ticker : 'el equivalente a $' + usd + ' en ' + n.ticker);
  paySet('cryptoAmountRaw', n.stable ? String(usd) : String(usd));
  paySet('cryptoNet', n.net);
  paySet('cryptoAddr', n.address);
  paySet('cryptoWarn', '⚠️ ' + n.warn);
  const qr = document.getElementById('payQr');
  if (qr) {
    qr.style.display = '';
    qr.src = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=0&color=04140a&bgcolor=ffffff&data=' +
             encodeURIComponent(n.address);
  }

  /* Tarjeta */
  const link  = (PAY_CONFIG.card.links || {})[payState.plan] || '';
  const ready = document.getElementById('cardReady');
  const pend  = document.getElementById('cardPending');
  const btn   = document.getElementById('cardPayBtn');
  if (ready && pend) {
    ready.style.display = link ? 'block' : 'none';
    pend.style.display  = link ? 'none'  : 'block';
  }
  if (btn && link) btn.href = link;
  paySet('cardBtnAmount', '$' + usd);

  /* Instagram */
  const ig = PAY_CONFIG.instagram ? 'https://instagram.com/' + PAY_CONFIG.instagram : '';
  ['vesAltBtn', 'cryptoAltBtn', 'cardAltBtn'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (ig) { el.href = ig; el.style.display = ''; }
    else    { el.style.display = 'none'; }
  });

  /* Plan activo */
  Object.keys(PAY_CONFIG.plans).forEach(k => {
    const el = document.getElementById('payPlan-' + k);
    if (el) el.classList.toggle('active', k === payState.plan);
  });
}

/* ─── Navegación del modal ────────────────────────────────── */
function payTab(tab) {
  payState.tab = tab;
  document.querySelectorAll('.pay-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.pay-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === tab));
}

function payPlan(plan) {
  if (!PAY_CONFIG.plans[plan]) return;
  payState.plan = plan;
  payRefresh();
}

function openPay(plan, tab) {
  const modal = document.getElementById('payModal');
  if (!modal) return;
  if (plan) payPlan(plan);
  payRenderNets();
  payRefresh();
  payTab(tab || 'ves');
  payFetchRate();
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePay() {
  const modal = document.getElementById('payModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── Copiar al portapapeles ──────────────────────────────── */
function payCopy(btn, id) {
  const el = document.getElementById(id);
  if (!el || !btn) return;
  const txt = el.textContent.trim();
  const done = () => {
    const prev = btn.textContent;
    btn.textContent = '✓ COPIADO';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = prev; btn.classList.remove('copied'); }, 2000);
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(txt).then(done).catch(() => payCopyFallback(txt, done));
  } else {
    payCopyFallback(txt, done);
  }
}
function payCopyFallback(txt, done) {
  const ta = document.createElement('textarea');
  ta.value = txt;
  ta.style.cssText = 'position:fixed;opacity:0;';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); done(); } catch (e) { /* noop */ }
  document.body.removeChild(ta);
}

/* ─── Confirmación del pago ───────────────────────────────── */
function payField(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }
function payFlag(id, bad) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('invalid', !!bad);
  if (bad) { el.focus(); }
}

function payConfirm(method) {
  const plan = payPlanData();
  const ids = {
    ves:     { name: 'vesName',    email: 'vesEmail',    extra: 'vesRef' },
    cripto:  { name: 'cryptoName', email: 'cryptoEmail', extra: 'cryptoTx' },
    tarjeta: { name: 'cardName',   email: 'cardEmail2',  extra: 'cardCountry' }
  }[method];
  if (!ids) return;

  const name  = payField(ids.name);
  const email = payField(ids.email);
  const extra = payField(ids.extra);

  payFlag(ids.email, false);
  payFlag(ids.name, false);
  if (!name)  { payFlag(ids.name, true);  return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { payFlag(ids.email, true); return; }

  const lines = ['Hola, quiero inscribirme en FREEDOM SYSTEM.', ''];
  lines.push('• Plan: ' + plan.name + ' ($' + plan.usd + ' · ' + plan.note + ')');

  if (method === 'ves') {
    lines.push('• Método: Bolívares (Pago Móvil)');
    lines.push('• Monto: ' + payFmtVes(plan.usd * payState.rate) + ' (tasa Bs ' + payState.rate.toFixed(2).replace('.', ',') + ' por $1)');
    if (extra) lines.push('• Referencia: ' + extra);
  } else if (method === 'cripto') {
    const n = payNetData();
    lines.push('• Método: Cripto · ' + n.ticker + ' por ' + n.net);
    lines.push('• Monto: ' + (n.stable ? plan.usd + ' ' + n.ticker : 'equivalente a $' + plan.usd + ' en ' + n.ticker));
    if (extra) lines.push('• Hash / TXID: ' + extra);
  } else {
    lines.push('• Método: Tarjeta — solicito el enlace de pago');
    if (extra) lines.push('• País: ' + extra);
  }

  lines.push('• Nombre: ' + name);
  lines.push('• Correo: ' + email);

  const msg = lines.join('\n');

  if (PAY_CONFIG.whatsapp) {
    window.open('https://wa.me/' + PAY_CONFIG.whatsapp + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  } else if (PAY_CONFIG.email) {
    window.open('mailto:' + PAY_CONFIG.email +
      '?subject=' + encodeURIComponent('Inscripción Freedom System — ' + plan.name) +
      '&body=' + encodeURIComponent(msg), '_blank', 'noopener');
  }
}

/* ─── Enlaces globales y cierre ───────────────────────────── */
window.openPay    = openPay;
window.closePay   = closePay;
window.payTab     = payTab;
window.payPlan    = payPlan;
window.payCopy    = payCopy;
window.payConfirm = payConfirm;
/* compatibilidad con el botón antiguo de USDT */
window.openUsdt   = function () { openPay('base', 'cripto'); };
window.closeUsdt  = closePay;

/* Reserva de plaza en las clases, y aviso de apertura del curso.
   Las clases todavía no tienen precio, así que esto no es un cobro:
   abre WhatsApp para que Infante confirme plaza e importe. */
function payWaitlist(que) {
  const textos = {
    clases:   'Hola, quiero reservar una plaza en LA ACADEMIA (primera promoción, 50 plazas, $299). ¿Me confirmas disponibilidad?',
    curso:    'Hola, avisadme cuando abra EL CURSO COMPLETO de Freedom System ($299, 2027).',
    mentoria: 'Hola, quiero información sobre LA MENTORÍA de Freedom System: formato, duración y precio.'
  };
  const asuntos = {
    clases:   'Reserva de plaza — La academia',
    curso:    'Aviso de apertura — Curso completo',
    mentoria: 'Información — La mentoría'
  };
  const k = textos[que] ? que : 'clases';
  const msg = textos[k];
  if (PAY_CONFIG.whatsapp) {
    window.open('https://wa.me/' + PAY_CONFIG.whatsapp + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  } else if (PAY_CONFIG.email) {
    window.open('mailto:' + PAY_CONFIG.email +
      '?subject=' + encodeURIComponent(asuntos[k]) +
      '&body=' + encodeURIComponent(msg), '_blank', 'noopener');
  }
}
window.payWaitlist = payWaitlist;

const payModalEl = document.getElementById('payModal');
if (payModalEl) {
  payModalEl.addEventListener('click', function (e) { if (e.target === this) closePay(); });
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && payModalEl && payModalEl.classList.contains('open')) closePay();
});

/* Limpia el estado de error al escribir */
document.querySelectorAll('.pay-input').forEach(i => {
  i.addEventListener('input', () => i.classList.remove('invalid'));
});

payRenderNets();
payRefresh();
payFetchRate();


/* ─── Sticky bar ──────────────────────────────────── */
const stickyBar = document.getElementById('stickyBar');
window.addEventListener('scroll', () => {
  if (!stickyBar) return;
  if (window.scrollY > 400) stickyBar.classList.add('visible');
  else stickyBar.classList.remove('visible');
});

/* ─── Countdown ───────────────────────────────────── */
(function() {
  /* Algunos navegadores bloquean el almacenamiento (modo privado, ajustes de
     cookies, navegadores dentro de apps). Sin este blindaje, la excepción
     detendría todo el script que viene después. */
  const store = {
    get(k)    { try { return localStorage.getItem(k); }   catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); }       catch (e) {} },
    del(k)    { try { localStorage.removeItem(k); }       catch (e) {} }
  };

  const key = 'ep_cd_end';
  let end = store.get(key);
  if (!end || Date.now() > parseInt(end)) {
    end = Date.now() + 24 * 60 * 60 * 1000;
    store.set(key, end);
  }
  function tick() {
    const hEl = document.getElementById('cd-h');
    const mEl = document.getElementById('cd-m');
    const sEl = document.getElementById('cd-s');
    if (!hEl || !mEl || !sEl) return;
    const diff = parseInt(end) - Date.now();
    if (diff <= 0) { store.del(key); return; }
    hEl.textContent = String(Math.floor(diff / 3600000)).padStart(2,'0');
    mEl.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
    sEl.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);
})();

/* ─── Exit popup ──────────────────────────────────── */
let exitShown = false;
const exitPopup = document.getElementById('exitPopup');
document.addEventListener('mouseleave', (e) => {
  if (e.clientY <= 0 && !exitShown && exitPopup) {
    exitShown = true;
    exitPopup.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
});
function closeExit() {
  if (exitPopup) exitPopup.classList.remove('open');
  document.body.style.overflow = '';
}
window.closeExit = closeExit;
if (exitPopup) {
  exitPopup.addEventListener('click', function(e) {
    if (e.target === this) closeExit();
  });
}

/* ─── Hide float btn near footer ─────────────────── */
window.addEventListener('scroll', () => {
  const fb = document.getElementById('floatBtn');
  const footer = document.querySelector('footer');
  if (!fb) return;
  if (footer) {
    fb.style.opacity = footer.getBoundingClientRect().top < 200 ? '0' : '1';
  }
});

}); // end DOMContentLoaded

/* ─── Count-up animation on results ─────────────────── */
const resultNum = document.querySelector('.results-amount');
if (resultNum) {
  const target = 266000;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        resultNum.classList.add('visible-num');
        let start = 0;
        const duration = 1800;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const val = Math.floor(eased * target);
          resultNum.textContent = '$' + val.toLocaleString('en-US') + '+';
          if (progress < 1) requestAnimationFrame(step);
          else resultNum.textContent = '$266,000+';
        };
        requestAnimationFrame(step);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  obs.observe(resultNum);
}

