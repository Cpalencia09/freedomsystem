# FREEDOM SYSTEM — Landing

Landing page del curso **Freedom System** (Infante · CEO de OWN THE WAR), con pasarela de pago
integrada para **bolívares, criptomonedas y tarjeta**.

Sitio estático de un solo archivo: `index.html` contiene el HTML, el CSS y el JavaScript.
No hay build, ni dependencias, ni backend.

**En producción:** https://cpalencia09.github.io/freedomsystem/

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

| Plan | Precio |
|------|--------|
| Acceso Base (curso completo) | $300 · pago único |
| Cuota mensual (IA + comunidad + actualizaciones) | $50/mes |

Para cambiarlos hay que tocar dos sitios: el bloque `PAY_CONFIG.plans` del script y los textos
visibles (tarjeta de precios, barra fija, popup de salida, botón flotante, CTA final y FAQ).

## Configurar los datos de cobro

Todo lo editable está en el bloque **`PAY_CONFIG`**, dentro del `<script>` al final de `index.html`
(busca `EDITA SOLO ESTE BLOQUE`). Ahí se define:

- `whatsapp` — número con código de país, sin `+` ni espacios. Es donde llegan las confirmaciones de pago.
- `instagram` — usuario sin `@` (déjalo vacío para ocultar ese botón).
- `email` — se usa como respaldo si no hay WhatsApp configurado.
- `ves` — banco, teléfono, cédula/RIF, titular y cuenta para Pago Móvil y transferencia.
- `crypto.nets` — direcciones de wallet por red (USDT TRC20, USDT BEP20, Binance Pay, Bitcoin).
- `card.links` — enlace de pago con tarjeta por plan (Stripe Payment Link, PayPal, etc.).

Los valores actuales son marcadores (`TU_DIRECCION_USDT_TRC20`, `0412-0000000`…): hay que
sustituirlos por los reales antes de aceptar pagos.

### Tasa de cambio

El monto en bolívares se calcula con la **tasa BCV oficial**, consultada en cada apertura del checkout
a `https://ve.dolarapi.com/v1/dolares/oficial`. Si la consulta falla se usa `ves.rate` como respaldo,
así que conviene mantener ese valor razonablemente actualizado. Para desactivar la consulta automática
y usar siempre una tasa fija, pon `autoRate: false`.

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
