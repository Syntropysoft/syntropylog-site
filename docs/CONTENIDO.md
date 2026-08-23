# Propuesta de contenido — syntropysoft.com

> **Borrador para revisar.** El copy es decisión del maintainer. Los hechos de abajo están
> verificados contra los repos y los registries el 2026-08-23.

**Decisiones tomadas:** posicionamiento *expertos en observabilidad* · en el sitio quedan
SyntropyLog + SyntropyLedger + syntroAuth · el Ledger y syntroAuth entran **como capacidad, sin
repo** · el ejemplo 22 va **hosteado** · se abre el repo de slpy · el render server-side entra en el
mismo trabajo.

---

## 1. El posicionamiento

Tres productos bajo un mismo techo necesitan una sola pregunta que los ordene. La que los une:

> ### Saber qué pasó en tu sistema. Y poder probarlo.

| Producto | Responde |
|---|---|
| **SyntropyLog** | qué está diciendo tu sistema **mientras corre** |
| **SyntropyLedger** | qué podés **probar después**, ante quien te lo pida |
| **syntroAuth** | **quién** lo hizo |

Sin ese encuadre, syntroAuth queda fuera de tema: es autenticación en un sitio de observabilidad.
Con él, los tres son la misma disciplina — trazabilidad de punta a punta — y el sitio puede
reclamar experiencia en vez de vender features sueltas.

**Lo que hace creíble la palabra "expertos"** no es decirla: es mostrar decisiones de diseño que
solo toma quien se comió el problema. Esas decisiones existen y están implementadas (§4).

---

## 2. Base de hechos

| Producto | Publicado como | Versión | Repo | En el sitio |
|---|---|---|---|---|
| SyntropyLog (Node) | npm `syntropylog` | **2.1.0** | público | producto, con links |
| SyntropyLog (Python) | PyPI `slpy-log` | **2.0.0** | **privado → abrir** | producto, con links |
| SyntropyLog (.NET) | NuGet `sl4n` + `.AspNetCore` + `.Testing` | **1.1.0** | público | producto, con links |
| SyntropyLog (Java) | — | `0.1.0-SNAPSHOT` | privado | "en desarrollo", sin link |
| SyntropyLedger | — | — | privado | **capacidad, sin repo** |
| syntroAuth | — | — | privado (cuenta personal) | **capacidad, sin repo** |

**Salen del sitio:** SyntroJS (0.8.0), SyntropyFront (0.4.8), Praetorian (0.0.4-alpha).

### Lo que se puede afirmar

- **La salida del masking es canónica.** `mask-parity-cases.json` es **el mismo archivo, byte por
  byte** (md5 `8eec8a82008d52b22be29e4aebb031d4`) en las suites de Node, Python y Java.
- **Propagación de contexto** con nombres conceptuales ↔ de wire y middleware HTTP, en las tres
  implementaciones publicadas.
- **El logging nunca tira**: el fallo sale por hook y contador, nunca como excepción al caller.
- **Logging Matrix**: campos core, bindings de `child()` y kwargs por llamada nunca se filtran.
- **Del Ledger**: hash-chain, transparency log Merkle (RFC 6962), checkpoints firmados ES256,
  pruebas de inclusión y consistencia por HTTP, .NET 10 Native AOT, 63 tests.

### Lo que NO se afirma

- ❌ Java disponible. Está en `0.1.0-SNAPSHOT`, sin publicar.
- ❌ Paridad total. Es paridad **de contrato**, con divergencias deliberadas y documentadas.
- ❌ Ningún número de adopción o "trusted by" sin dato medido detrás.
- ❌ **Nada del material de cliente del Ledger**: COELSA, Echeq y el caso de cédula judicial no
  salen al sitio, ni como ejemplo anónimo. El caso de uso se cuenta en genérico.

---

## 3. Estructura de la home

| # | Sección | Qué hace | Estado |
|---|---|---|---|
| 1 | **Hero** | La pregunta que ordena todo + el CTA al demo | reescribir |
| 2 | **El problema** | Por qué un stack políglota no tiene cuatro problemas, tiene uno | **nueva** |
| 3 | **El demo en vivo** | El 22 hosteado. La prueba, arriba de todo | **nueva** |
| 4 | **Cómo pensamos la observabilidad** | Cuatro decisiones de diseño. Acá se gana "expertos" | **nueva** |
| 5 | **SyntropyLog** | El producto, con la matriz de lenguajes | reescribir |
| 6 | **Empezá en tu lenguaje** | Instalación y primer log, en tabs | **nueva** (reusa `quickStart`) |
| 7 | **Más allá de los logs** | Ledger y syntroAuth como capacidades, con CTA de contacto | **nueva** |
| 8 | **Quiénes somos** | Sin cambios de fondo | conservar |
| 9 | **Sponsors** | Sin cambios | conservar |

El demo va **antes** que el producto: la prueba primero, la explicación después.

---

## 4. El copy

### 4.1 Hero

**EN**
> ### Know what happened in your system. **And prove it.**
> Observability isn't a dashboard you buy. It's a property you design in — and it has to survive
> every language boundary your stack crosses.
>
> `[ Watch one order cross 5 services, live ]` `[ Start with your language ]`

**ES**
> ### Saber qué pasó en tu sistema. **Y poder probarlo.**
> La observabilidad no es un dashboard que se compra. Es una propiedad que se diseña — y tiene que
> sobrevivir cada frontera de lenguaje que tu stack cruza.
>
> `[ Mirá un pedido cruzar 5 servicios, en vivo ]` `[ Empezá en tu lenguaje ]`

*Por qué:* "Forging the Future of DevSecOps" no dice qué hacen. Esto dice el problema y ofrece la
prueba en el primer scroll.

---

### 4.2 El problema

**EN**
> ### Your stack speaks three languages. Your logs speak three dialects.
> A request crosses your Node gateway, your Python worker and your .NET service. Three loggers,
> three ways of masking a credit card, three names for the same correlation id, three answers to
> "what happens when the log sink goes down".
>
> Correlating that request means reconciling three different truths — by hand, at 3 a.m., while
> someone waits.

**ES**
> ### Tu stack habla tres lenguajes. Tus logs hablan tres dialectos.
> Un request cruza tu gateway en Node, tu worker en Python y tu servicio en .NET. Tres loggers, tres
> formas de enmascarar una tarjeta, tres nombres para el mismo correlation id, tres respuestas a
> "qué pasa cuando el destino de logs se cae".
>
> Correlacionar ese request es reconciliar tres verdades distintas — a mano, a las 3 de la mañana,
> con alguien esperando.

---

### 4.3 El demo en vivo

**EN**
> ### Don't take our word for it. Place an order.
> One click in the storefront. Watch the **same correlation id** appear across an Express gateway, a
> NestJS service, a Kafka topic, a Python FastAPI worker and a TypeScript worker — every log
> stitched into one distributed trace, with the card number, CVV and email **masked automatically**.
>
> Then open the waterfall: the same order as a tree of timed spans, crossing a message broker **and
> a language boundary**, assembled by a .NET Native AOT collector.
>
> No Datadog. No APM. No per-language adapter.

**ES**
> ### No nos creas. Hacé un pedido.
> Un click en la tienda. Mirá el **mismo correlation id** aparecer en un gateway Express, un
> servicio NestJS, un topic de Kafka, un worker Python con FastAPI y un worker TypeScript — cada log
> hilvanado en una sola traza distribuida, con el número de tarjeta, el CVV y el email
> **enmascarados solos**.
>
> Después abrí el waterfall: el mismo pedido como árbol de spans, cruzando un broker **y una
> frontera de lenguaje**, armado por un collector .NET Native AOT.
>
> Sin Datadog. Sin APM. Sin un adapter por lenguaje.

> **Nota de implementación:** esta sección depende de que el 22 esté hosteado (§7). Hasta entonces,
> el bloque puede ir con captura + link al repo, marcado como provisorio.

---

### 4.4 Cómo pensamos la observabilidad

*Esta es la sección que sostiene la palabra "expertos". Son cuatro decisiones implementadas, no
principios de marketing.*

**EN**

> #### The logging path never throws
> If your logger can crash your request handler, it is not an observability tool — it is a new
> failure mode. A failure goes to a hook and a counter. Never to your caller.
>
> #### A masking strategy is data, not code
> Adding a strategy shouldn't mean writing the same function in four languages. It's a spec the
> engine interprets — which is why the output can be identical everywhere.
>
> #### Wire names belong to your services, not to us
> Your gateway calls it `x-request-id` and the legacy service calls it `X-Correlation`. Each service
> declares its own map, and the id survives the translation. Headers don't have to agree.
>
> #### Parity is proven by a test, not by a document
> The same seventeen masking cases — literally the same file, byte for byte — run in the Node,
> Python and Java suites. If an implementation drifts, its build turns red. Where they differ, they
> differ on purpose, and each keeps a parity roadmap that says which difference and why.

**ES**

> #### El camino del logging nunca tira
> Si tu logger puede voltear tu handler, no es una herramienta de observabilidad: es un modo de
> falla nuevo. El fallo sale por hook y por contador. Nunca a quien llama.
>
> #### Una estrategia de masking es dato, no código
> Agregar una estrategia no debería ser escribir la misma función en cuatro lenguajes. Es un spec
> que el motor interpreta — y por eso la salida puede ser idéntica en todos lados.
>
> #### Los nombres de wire son de tus servicios, no nuestros
> Tu gateway le dice `x-request-id` y el sistema viejo le dice `X-Correlation`. Cada servicio declara
> su mapa y el id sobrevive la traducción. Los headers no tienen que ponerse de acuerdo.
>
> #### La paridad se prueba con un test, no con un documento
> Los mismos diecisiete casos de masking — literalmente el mismo archivo, byte por byte— corren en
> las suites de Node, Python y Java. Si una implementación deriva, su build se pone en rojo. Donde
> difieren, difieren a propósito, y cada una mantiene un roadmap que dice cuál diferencia y por qué.

---

### 4.5 SyntropyLog — matriz de lenguajes

| Language | Package | Version | Notes |
|---|---|---|---|
| Node.js | `syntropylog` (npm) | 2.1.0 | native Rust engine |
| Python | `slpy-log` (PyPI) | 2.0.0 | CPython 3.7+ · optional Rust engine |
| .NET | `sl4n` (NuGet) | 1.1.0 | net8.0 · Native AOT |
| Java | — | in development | — |

---

### 4.6 Empezá en tu lenguaje

```bash
npm install syntropylog          # Node.js
pip install slpy-log             # Python
dotnet add package sl4n          # .NET
```

> **Pendiente tuyo:** el snippet de "primer log" de cada lenguaje. Los saco de los README si querés,
> pero decidí vos cuál vende mejor.

---

### 4.7 Más allá de los logs

Dos capacidades, sin repo y sin nombres de cliente. CTA de contacto, no de instalación.

**EN**
> #### SyntropyLedger — evidence you can hand to an auditor
> A tamper-evident record of what your systems did. Append-only, hash-chained, sealed into a Merkle
> transparency log with signed checkpoints — so anyone can verify that an entry existed, and that
> the history was never rewritten. Built on .NET Native AOT.
>
> #### syntroAuth — identity that answers "who"
> Authentication and authorization designed for systems that have to prove what happened, not just
> allow it: token rotation with theft detection, MFA, and a fail-closed posture by default.
>
> `[ Talk to us ]`

**ES**
> #### SyntropyLedger — evidencia que le podés dar a un auditor
> Un registro a prueba de manipulación de lo que hicieron tus sistemas. Solo-agregar, encadenado por
> hash, sellado en un transparency log Merkle con checkpoints firmados — para que cualquiera pueda
> verificar que una entrada existió y que la historia nunca se reescribió. Sobre .NET Native AOT.
>
> #### syntroAuth — identidad que responde "quién"
> Autenticación y autorización pensadas para sistemas que tienen que **probar** lo que pasó, no solo
> permitirlo: rotación de tokens con detección de robo, MFA y postura fail-closed por defecto.
>
> `[ Hablemos ]`

> ⚠️ Verificar conmigo cada capacidad de syntroAuth antes de publicarla: escribí "rotación con
> detección de robo, MFA, fail-closed" desde el chasis del repo, no desde una auditoría del código.

---

## 5. Qué pasa con el copy existente

| Bloque | Destino |
|---|---|
| `hero` | reescribir (4.1) |
| `syntropylog` | reescribir (4.5) |
| `ecosystem` | **se borra** — el ecosistema de cuatro productos ya no es el mensaje |
| `sintrojs` | **se borra** del sitio (el producto sigue existiendo, no se promociona acá) |
| `about`, `sponsors` | conservar |
| `features`, `stats`, `contact` | huérfanos hoy — **no vuelven** |
| `quickStart` | se recupera en 4.6 |

---

## 6. El cambio de render

Hoy `useTranslations` es un hook `'use client'` que hace `import()` de los JSON en un `useEffect`:
**el copy no está en el HTML servido** (verificado contra producción). Escribir todo esto sin
arreglarlo es pagarlo dos veces.

1. Función pura `getMessages(locale)` que lee los JSON **en el servidor**.
2. Las secciones pasan a Server Components y reciben el texto por props.
3. `'use client'` queda solo donde hay interacción: menú móvil, switch de idioma, tabs de 4.6, el
   iframe/embed del demo.

**Verificación:** `curl` al HTML de `/en` y `/es` buscando una frase de cada sección. Si no aparece
sin ejecutar JS, no está hecho.

---

## 7. Trabajos habilitantes (fuera del contenido, en el camino crítico)

### 7.1 Abrir el repo de slpy
Sin esto el mensaje multi-lenguaje se cae: hoy el repo da 404 y con él los `project.urls` del
paquete en PyPI, el badge de CI del README y **el link a slpy desde el README público del ejemplo
22**. Es una acción de cuenta, tuya.

### 7.2 Hostear el ejemplo 22
Es la pieza más cara y sostiene la sección 4.3. Hay que levantar: Kafka, Redis, gateway (Express),
orders (NestJS), payments (Fastify), inventory (FastAPI/Python), notifications (worker), el
collector `traceability` (.NET AOT) y el frontend. **No va en Vercel.**

A favor: ya usás **Railway** para el Ledger y el Native AOT ya linkea en Linux ahí — el camino está
probado. Riesgos a resolver antes de prometer el CTA: costo con Kafka corriendo permanente, reset
del estado entre visitantes, y abuso (cualquiera puede apretar "Place order" en loop).

> Sugerencia: tratarlo como su propio `/sf-plan`. Mientras no esté, 4.3 va con captura y marca de
> provisorio, y el hero apunta a "Empezá en tu lenguaje".

---

## 8. Preguntas abiertas

1. **El encuadre de §1.** ¿"Saber qué pasó. Y poder probarlo" te representa? Es lo que hace que
   syntroAuth no quede fuera de tema.
2. **Snippets de 4.6** — cuál es el primer log que mejor vende cada lenguaje.
3. **Capacidades de syntroAuth** — confirmar una por una antes de publicarlas.
4. **SyntroJS** — sale del sitio. ¿Se le hace una página propia después, o queda solo en npm?
5. **El demo** — ¿arrancamos por hostearlo, o publicamos el contenido con captura y lo hosteamos
   después?
