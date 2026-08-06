# FREEDOM SYSTEM â€” Landing

Landing page del curso **Freedom System** (Infante Â· CEO de OWN THE WAR), con pasarela de pago
integrada para **bolÃ­vares, criptomonedas y tarjeta**.

Sitio estÃ¡tico de un solo archivo: `index.html` contiene el HTML, el CSS y el JavaScript.
No hay build, ni dependencias, ni backend.

## Ver la pÃ¡gina en local

Abre `index.html` en el navegador con doble clic, o sirve la carpeta:

```bash
python -m http.server 8000
```

## Precios

| Plan | Precio |
|------|--------|
| Acceso Base (curso completo) | $300 Â· pago Ãºnico |
| Cuota mensual (IA + comunidad + actualizaciones) | $50/mes |

Para cambiarlos hay que tocar dos sitios: el bloque `PAY_CONFIG.plans` del script y los textos
visibles (tarjeta de precios, barra fija, popup de salida, botÃ³n flotante y FAQ).

## Configurar los datos de cobro

Todo lo editable estÃ¡ en el bloque **`PAY_CONFIG`**, dentro del `<script>` al final de `index.html`
(busca `EDITA SOLO ESTE BLOQUE`). AhÃ­ se define:

- `whatsapp` â€” nÃºmero con cÃ³digo de paÃ­s, sin `+` ni espacios. Es donde llegan las confirmaciones de pago.
- `instagram` â€” usuario sin `@` (dÃ©jalo vacÃ­o para ocultar ese botÃ³n).
- `email` â€” se usa como respaldo si no hay WhatsApp configurado.
- `ves` â€” banco, telÃ©fono, cÃ©dula/RIF, titular y cuenta para Pago MÃ³vil y transferencia.
- `crypto.nets` â€” direcciones de wallet por red (USDT TRC20, USDT BEP20, Binance Pay, Bitcoin).
- `card.links` â€” enlace de pago con tarjeta por plan (Stripe Payment Link, PayPal, etc.).

Los valores actuales son marcadores (`TU_DIRECCION_USDT_TRC20`, `0412-0000000`â€¦): hay que
sustituirlos por los reales antes de aceptar pagos.

### Tasa de cambio

El monto en bolÃ­vares se calcula con la **tasa BCV oficial**, consultada en cada apertura del checkout
a `https://ve.dolarapi.com/v1/dolares/oficial`. Si la consulta falla se usa `ves.rate` como respaldo,
asÃ­ que conviene mantener ese valor razonablemente actualizado. Para desactivar la consulta automÃ¡tica
y usar siempre una tasa fija, pon `autoRate: false`.

### Tarjeta

Mientras `card.links` estÃ© vacÃ­o, el panel de tarjeta muestra el flujo de "solicitar enlace de pago"
por WhatsApp. En cuanto pegues un enlace de pago, ese mismo panel pasa automÃ¡ticamente a mostrar el
botÃ³n que lleva al checkout del proveedor. Los datos de la tarjeta nunca pasan por esta pÃ¡gina.

## CÃ³mo funcionan los pagos

La confirmaciÃ³n es **manual**: el cliente paga por el medio que elija, pulsa el botÃ³n de confirmar y
se abre WhatsApp con un mensaje ya redactado (plan, mÃ©todo, monto, referencia o hash, nombre y correo).
TÃº verificas y entregas los accesos. No hay cobro ni entrega automÃ¡ticos.

## Despliegue

Publicado con **GitHub Pages** en modo *deploy from a branch*: rama `main`, carpeta raiz.
Cada push a `main` reconstruye el sitio en https://cpalencia09.github.io/freedomsystem/
