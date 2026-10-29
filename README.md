# FREEDOM SYSTEM — Landing

Landing page del curso **Freedom System** (Infante · CEO de OWN THE WAR), con pasarela de pago
integrada para **bolívares, criptomonedas y tarjeta**.

Sitio estático de **cuatro páginas**, sin build, sin dependencias y sin backend:

| Archivo | Qué es |
|---------|--------|
| `index.html` | Portada. Acaba en la auditoría de resultados: hero → por dónde entrar → la academia → biografía → auditoría. |
| `academia.html` | La academia al detalle, con su pasarela. $299, pago único. |
| `comunidad.html` | La comunidad al detalle, con su pasarela. $50/mes. |
| `curso.html` | El curso de 2027. **No cobra**: lista de espera por WhatsApp. |
| `estilos.css` | Hoja de estilos compartida por las cuatro. |
| `pagos.js` | Lógica compartida: tasa de cambio, pasarela y FAQ. Incluye el marcado del modal de pago, que se inyecta al cargar. |

Hasta octubre de 2026 era un único `index.html` con todo dentro. Se partió al dar a cada producto
su propia página: el CSS y el JS salieron a archivos compartidos para no repetir 2.000 y 800
líneas en cada una.

**Al tocar la cabecera** (dominio, píxel, analitica) hay que hacerlo en las **cuatro** páginas,
no solo en `index.html`.

**En producción:** https://freedomsystem.net/

## Material de marca

En `marca/` están el símbolo del halcón y el manual de marca en PDF:

| Archivo | Para qué |
|---------|----------|
| `logo-oscuro.png` (+ `-512`, `-256`) | Fondo oscuro. Es el que usan la barra de navegación y el pie. |
| `logo-claro.png` (+ `-512`, `-256`) | Fondo blanco o papel. |
| `logo-mono-verde.png` / `logo-mono-void.png` | Una sola tinta, para bordados, sellos y fondos de color plano. |
| `logo-fondo-void.png` | Ya aplanado sobre `#010a03`, para donde no admitan PNG con transparencia. |
| `Manual-de-Marca-Freedom-System.pdf` | Identidad visual y verbal completa: color, tipografía, tono de voz y usos incorrectos. |

Por debajo de 40 px de alto el símbolo deja de leerse: para el favicon se usa el monograma
`favicon.svg`, no el halcón.

## Ver la página en local

Abre `index.html` en el navegador con doble clic, o sirve la carpeta:

```bash
python -m http.server 8000
```

## Precios

Cuatro productos, que se contratan por separado:

| Producto | Precio | Estado |
|----------|--------|--------|
| **La academia** — primera promoción, 50 plazas, en directo | $299 · pago único | Abierta |
| **La comunidad** — sala privada, grabaciones e IA | $50/mes · sin permanencia | Abierta |
| **El curso completo** — grabado, sin límite de plazas | $299 · el mismo precio | Abre en 2027 |
| **La mentoría** — uno a uno con Infante | Por anunciar | Por definir |

La academia y la comunidad se cobran por el checkout. El curso y la mentoría abren la lista de
espera por WhatsApp (`payWaitlist`), porque todavía no se cobran.

Para cambiar un precio hay que tocar **dos** sitios: el bloque `PAY_CONFIG.plans` del script y los
textos visibles, que están en el panel de accesos (`#planes`), la sección de la academia, la
tarjeta de precios, la barra fija, el popup de salida y la FAQ.

## Configurar los datos de cobro

Todo lo editable está en el bloque **`PAY_CONFIG`**, dentro del `<script>` al final de `index.html`
(busca `EDITA SOLO ESTE BLOQUE`). Ahí se define:

- `whatsapp` — número con código de país, sin `+` ni espacios. Es donde llegan las confirmaciones de pago.
- `instagram` — usuario sin `@` (déjalo vacío para ocultar ese botón).
- `email` — se usa como respaldo si no hay WhatsApp configurado.
- `ves` — banco, teléfono, cédula/RIF, titular y cuenta para Pago Móvil y transferencia.
- `crypto.nets` — direcciones de wallet por red (USDT TRC20, Binance Pay, Bitcoin). BEP20 se
  retiró: una dirección de TRON no sirve en BNB Smart Chain.
- `card.links` — enlace de pago con tarjeta por plan (Stripe Payment Link, PayPal, etc.).

Los datos de cobro ya son los reales. Lo único que sigue vacío a propósito es `card.links` (el
enlace de pago con tarjeta): mientras lo esté, ese panel ofrece pedir el enlace por WhatsApp.

### Tasa de cambio

El monto en bolívares se calcula con la **tasa del mercado paralelo**, consultada en cada apertura
del checkout a `https://ve.dolarapi.com/v1/dolares/paralelo` (devuelve `{promedio, fechaActualizacion}`
y permite CORS, que es lo que hace falta para pedirla desde el navegador del visitante).

Si la consulta falla se reutiliza la última tasa que el visitante tuviera guardada, y si no hay
ninguna, `ves.rate` como respaldo final — conviene mantener ese valor razonablemente actualizado.
Para desactivar la consulta automática y usar siempre una tasa fija, pon `autoRate: false`.

**Historial de la fuente.** Antes se usaba `criptoya.com/api/binancep2p/usdt/ves/1`, la tasa Binance
P2P. El **25/10/2026** ese servicio empezó a responder **403** (bloqueo de Cloudflare), tanto desde
el navegador como desde consola, y el sitio llevaba días cobrando con el valor de respaldo sin
avisar. El paralelo de dolarapi va a menos del 1% de la de Binance y se actualiza varias veces al
día. El parser acepta las dos formas de respuesta, así que si criptoya revive basta con cambiar
`rateApi`.

### Tarjeta

Mientras `card.links` esté vacío, el panel de tarjeta muestra el flujo de "solicitar enlace de pago"
por WhatsApp. En cuanto pegues un enlace de pago, ese mismo panel pasa automáticamente a mostrar el
botón que lleva al checkout del proveedor. Los datos de la tarjeta nunca pasan por esta página.

## Cómo funcionan los pagos

La confirmación es **manual**: el cliente paga por el medio que elija, pulsa el botón de confirmar y
se abre WhatsApp con un mensaje ya redactado (plan, método, monto, referencia o hash, nombre y correo).
Tú verificas y entregas los accesos. No hay cobro ni entrega automáticos.

## Despliegue

Publicado con **GitHub Pages** en modo *deploy from a branch*: rama `main`, carpeta raíz.
Cada push a `main` reconstruye el sitio automáticamente.
