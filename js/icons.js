/* =========================================================
   icons.js — ikon & logo SVG bergaya realistik (gradien, bayang, kilauan)
   Menggantikan emoji. Kunci ikon = emoji lama supaya data resepi sedia ada
   masih berfungsi tanpa perubahan.
   ========================================================= */
const Icons = (function () {
  const rg = (id, a, b) => `<radialGradient id="${id}" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
  const lg = (id, a, b) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;

  const SPRITE = `<svg id="iconSprite" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
    ${rg("gPlate", "#ffffff", "#ece1cd")}${lg("gRim", "#ffffff", "#cfc2a8")}
    ${rg("gRed", "#f37a62", "#a8241c")}${rg("gBrown", "#b06f42", "#3f1d0f")}
    ${rg("gGreen", "#9bd975", "#2b7431")}${rg("gGold", "#f9df95", "#c48a25")}
    ${lg("gFish", "#e2e6e8", "#76828b")}${rg("gCream", "#fffaf0", "#efd9a8")}
    ${lg("gCoffee", "#7a4527", "#25110a")}${lg("gPot", "#4a8471", "#1c4438")}
    ${lg("gSilver", "#ffffff", "#aab4b8")}${lg("gBook", "#3b7a67", "#21493e")}
    ${lg("gOrange", "#ffb45c", "#e07a1f")}${lg("gLens", "#e6f6ff", "#8cc3dd")}
  </defs></svg>`;

  const plate = `<ellipse cx="60" cy="105" rx="42" ry="7" fill="#26352F" opacity=".18"/><circle cx="60" cy="58" r="46" fill="url(#gRim)"/><circle cx="60" cy="58" r="40" fill="url(#gPlate)"/><circle cx="60" cy="58" r="30" fill="none" stroke="#e4d8c2" stroke-width="1.5"/>`;

  const grains = (pts) => pts.map(([x, y, a]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="1.4" fill="#fffdf5" opacity=".9" transform="rotate(${a} ${x} ${y})"/>`).join("");
  const RICE = [[44,52,20],[54,46,-30],[64,50,50],[74,54,-10],[48,60,-40],[58,58,10],[68,62,35],[78,64,-25],[40,64,15],[52,67,-15],[62,68,45],[72,70,0],[56,50,70],[46,70,30]];
  const riceMound = (t) => `<g transform="${t}"><path d="M28 68c-2-20 14-32 32-32s34 12 32 32c-1 7-14 9-32 9s-31-2-32-9z" fill="url(#gCream)"/><path d="M40 50c8-10 22-12 32-8" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6" fill="none"/>${grains(RICE)}</g>`;

  const drum = (t) => `<g transform="${t}"><rect x="62" y="54" width="30" height="8" rx="4" fill="#f5ecda"/><circle cx="93" cy="55" r="5" fill="#f5ecda"/><circle cx="93" cy="61" r="5" fill="#f5ecda"/><ellipse cx="46" cy="58" rx="24" ry="17" fill="url(#gRed)"/><ellipse cx="38" cy="50" rx="11" ry="4" fill="#fff" opacity=".35"/><circle cx="52" cy="62" r="1.6" fill="#7c1710"/><circle cx="44" cy="66" r="1.4" fill="#7c1710"/><circle cx="58" cy="54" r="1.4" fill="#ffd0a0"/></g>`;

  const egg = `<path d="M78 34c8-4 18 2 16 11s-10 12-18 10-8-17 2-21z" fill="#fff" stroke="#eadfca" stroke-width=".8"/><circle cx="84" cy="44" r="5.5" fill="url(#gGold)"/><circle cx="82.5" cy="42.5" r="1.6" fill="#fff" opacity=".8"/>`;
  const cuke = (x, y) => `<circle cx="${x}" cy="${y}" r="7" fill="#d7efc0"/><circle cx="${x}" cy="${y}" r="5.5" fill="url(#gGreen)"/><circle cx="${x}" cy="${y}" r="3" fill="#e9f7d8" opacity=".8"/>`;
  const floret = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="6" width="8" height="18" rx="3" fill="#a9d48a"/><circle cx="-9" cy="3" r="9" fill="url(#gGreen)"/><circle cx="9" cy="3" r="9" fill="url(#gGreen)"/><circle cx="0" cy="-5" r="10" fill="url(#gGreen)"/><circle cx="0" cy="4" r="9" fill="url(#gGreen)"/><circle cx="-4" cy="-8" r="3" fill="#fff" opacity=".3"/></g>`;
  const carrot = (x, y) => `<circle cx="${x}" cy="${y}" r="5.5" fill="url(#gOrange)"/><circle cx="${x}" cy="${y}" r="2.4" fill="#ffd9a3"/>`;

  const potBody = `<path d="M30 30c-4 6 4 9 0 15" stroke="#b9d3c6" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M60 24c-5 7 5 10 0 18" stroke="#b9d3c6" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M90 30c-4 6 4 9 0 15" stroke="#b9d3c6" stroke-width="3.5" stroke-linecap="round" fill="none"/><ellipse cx="60" cy="108" rx="38" ry="6" fill="#26352F" opacity=".2"/><rect x="8" y="66" width="18" height="9" rx="4.5" fill="#1c4438"/><rect x="94" y="66" width="18" height="9" rx="4.5" fill="#1c4438"/><path d="M20 62h80v14c0 20-15 32-40 32S20 96 20 76z" fill="url(#gPot)"/><path d="M28 70v8c0 10 6 18 16 22" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".35" fill="none"/><path d="M16 62c0-10 20-16 44-16s44 6 44 16z" fill="url(#gGold)"/><path d="M28 58c8-5 20-7 32-7" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".55" fill="none"/><circle cx="60" cy="44" r="5.5" fill="url(#gGold)"/>`;

  const ICONS = {
    "🍲": potBody,
    "logo": `<circle cx="60" cy="60" r="58" fill="#E5F0E5"/><circle cx="60" cy="60" r="55" fill="none" stroke="#fff" stroke-width="2" opacity=".8"/><g transform="translate(60 62) scale(.68) translate(-60 -64)">${potBody}</g>`,
    "🍗": plate + drum("rotate(-35 60 58) translate(4 -2)") + drum("rotate(150 60 58) translate(6 0) scale(.8) translate(15 14)") + `<circle cx="86" cy="80" r="4" fill="#e85b5b"/><circle cx="34" cy="38" r="3" fill="#3f8a3a"/>`,
    "🍖": plate + `<path d="M32 52c2-10 16-14 26-8s6 16-2 20-26 2-24-12z" fill="url(#gBrown)"/><path d="M60 46c8-8 24-6 28 4s-4 20-14 18-20-10-14-22z" fill="url(#gBrown)"/><path d="M40 68c6-4 18-2 22 4s-6 14-16 12-10-10-6-16z" fill="url(#gBrown)"/><ellipse cx="42" cy="47" rx="7" ry="2.5" fill="#fff" opacity=".28"/><ellipse cx="74" cy="46" rx="6" ry="2.2" fill="#fff" opacity=".25" transform="rotate(20 74 46)"/><path d="M78 74c6-2 12 2 12 8-6 2-12-2-12-8z" fill="url(#gGreen)"/><circle cx="52" cy="60" r="1.2" fill="#e8b878"/><circle cx="70" cy="60" r="1.2" fill="#e8b878"/><circle cx="50" cy="78" r="1.2" fill="#e8b878"/>`,
    "🐟": plate + `<g transform="rotate(-18 60 58)"><path d="M86 58l18-16v32z" fill="#8b969d"/><path d="M24 58c14-24 46-24 62 0-16 24-48 24-62 0z" fill="url(#gFish)"/><path d="M40 38c10-6 24-6 34 0-10-2-24-2-34 0z" fill="#6c7880"/><path d="M40 78c10 6 24 6 34 0-10 2-24 2-34 0z" fill="#6c7880"/><ellipse cx="54" cy="58" rx="24" ry="13" fill="url(#gRed)" opacity=".55"/><circle cx="34" cy="55" r="3.4" fill="#fff"/><circle cx="34" cy="55" r="1.8" fill="#222"/><path d="M46 46q6 12 0 24M56 45q6 13 0 26M66 46q6 12 0 24" stroke="#fff" stroke-width="1.2" opacity=".45" fill="none"/></g><circle cx="88" cy="84" r="3.4" fill="#e85b5b"/>`,
    "🥦": plate + floret(46, 52, 1) + floret(72, 60, .85) + carrot(40, 82) + carrot(52, 88) + carrot(64, 84) + `<rect x="76" y="76" width="12" height="12" rx="2.5" fill="#f4e6c1" stroke="#e2cf9f"/>`,
    "🍰": `<ellipse cx="60" cy="106" rx="44" ry="7" fill="#26352F" opacity=".18"/><ellipse cx="60" cy="92" rx="48" ry="10" fill="url(#gRim)"/><ellipse cx="60" cy="90" rx="41" ry="7.5" fill="url(#gPlate)"/><path d="M90 46l14-10v38L90 84z" fill="#3f9a4a"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="30" y="${(46 + i * 6.33).toFixed(2)}" width="60" height="6.33" fill="${i % 2 ? "#f5efd4" : "#79c46e"}"/>`).join("")}<path d="M30 46l14-10h60L90 46z" fill="#a4dd93"/><path d="M36 44l12-7" stroke="#fff" stroke-width="2" opacity=".6" stroke-linecap="round"/><path d="M90 46v38" stroke="#2c7a37" stroke-width="1" opacity=".5"/>`,
    "☕": `<ellipse cx="60" cy="106" rx="30" ry="5" fill="#26352F" opacity=".2"/><path d="M36 22h48l-6 78c0 3-3 5-6 5H48c-3 0-6-2-6-5z" fill="#fff" fill-opacity=".45" stroke="#c9d6d2" stroke-width="1.5"/><path d="M39 40h42l-4 60c0 3-3 5-6 5H49c-3 0-6-2-6-5z" fill="url(#gCoffee)"/><path d="M43 86c10-5 24 5 34-1l-.6 15c0 3-3 5-6 5H50c-3 0-6-2-6-5z" fill="#f6e6c4" opacity=".92"/><rect x="45" y="42" width="15" height="15" rx="3" fill="#fff" opacity=".5" transform="rotate(-12 52 50)"/><rect x="62" y="50" width="14" height="14" rx="3" fill="#fff" opacity=".42" transform="rotate(14 69 57)"/><rect x="66" y="8" width="7" height="60" rx="3.5" fill="#fff" transform="rotate(12 70 40)"/><path d="M69 10l4-1M67 22l4-1M65 34l4-1" stroke="#e85b5b" stroke-width="3" stroke-linecap="round" transform="rotate(12 70 40)"/><path d="M41 30l-2 56" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>`,
    "🍚": plate + riceMound("translate(60 60) scale(.72) translate(-60 -56)") + egg + cuke(30, 40) + cuke(38, 32) + `<circle cx="34" cy="84" r="3.4" fill="#e85b5b"/><ellipse cx="82" cy="84" rx="7" ry="2.4" fill="#c98f2c" transform="rotate(-20 82 84)"/>`,
    "🍪": plate + [[44, 46], [76, 50], [58, 74]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15" fill="url(#gGold)"/><circle cx="${x}" cy="${y}" r="15" fill="none" stroke="#b07a1e" stroke-width="1" opacity=".5"/><path d="M${x - 8} ${y - 6}l5 3M${x + 2} ${y - 8}l5 3M${x - 6} ${y + 4}l5-2M${x + 3} ${y + 5}l4 3M${x - 1} ${y - 1}l4 1" stroke="#fff3c9" stroke-width="2.2" stroke-linecap="round" opacity=".85"/>`).join(""),
    "🍽️": plate + `<path d="M30 68c0-16 13-26 30-26s30 10 30 26z" fill="url(#gSilver)" stroke="#8d989c" stroke-width="1"/><rect x="26" y="68" width="68" height="5" rx="2.5" fill="#8d989c"/><circle cx="60" cy="40" r="4" fill="url(#gSilver)" stroke="#8d989c" stroke-width="1"/><path d="M40 56c6-8 14-11 22-11" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7" fill="none"/>`,
    "hero": plate + riceMound("translate(60 60) scale(.66) translate(-52 -60)") + drum("rotate(-20 60 58) translate(10 22) scale(.85) translate(6 -10)") + egg + cuke(30, 44) + cuke(38, 34) + `<circle cx="34" cy="84" r="3.6" fill="#e85b5b"/><circle cx="44" cy="90" r="3" fill="#e85b5b"/>`,
    "book": `<ellipse cx="60" cy="108" rx="36" ry="5" fill="#26352F" opacity=".2"/><rect x="26" y="12" width="70" height="92" rx="8" fill="#f6efe0"/><rect x="22" y="10" width="70" height="92" rx="8" fill="url(#gBook)"/><rect x="28" y="10" width="2.5" height="92" fill="#fff" opacity=".25"/><circle cx="57" cy="46" r="17" fill="#f4e6c1" stroke="#e8c86a" stroke-width="2"/><path d="M50 40h14M50 46h14M50 52h9" stroke="#3b7a67" stroke-width="2.5" stroke-linecap="round"/><path d="M76 10v26l7-6 7 6V10z" fill="#e85b5b"/><rect x="38" y="76" width="38" height="4" rx="2" fill="#f4e6c1" opacity=".8"/>`,
    "search": `<ellipse cx="56" cy="108" rx="30" ry="5" fill="#26352F" opacity=".2"/><path d="M78 78l24 24" stroke="#6b4426" stroke-width="12" stroke-linecap="round"/><path d="M78 78l24 24" stroke="#a87747" stroke-width="6" stroke-linecap="round"/><circle cx="52" cy="52" r="34" fill="#c9d1d4"/><circle cx="52" cy="52" r="28" fill="url(#gLens)" opacity=".95"/><path d="M34 44a20 20 0 0 1 16-14" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".8"/>`,
    "heart": `<ellipse cx="60" cy="108" rx="30" ry="5" fill="#26352F" opacity=".2"/><path d="M60 102C22 74 12 54 12 40c0-14 11-24 24-24 10 0 19 6 24 15 5-9 14-15 24-15 13 0 24 10 24 24 0 14-10 34-48 62z" fill="url(#gRed)"/><path d="M28 34c2-8 10-12 17-9" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".6"/>`
  };

  function get(key) {
    const body = ICONS[key] || ICONS["🍽️"];
    return `<svg viewBox="0 0 120 120" role="img" aria-hidden="true" focusable="false">${body}</svg>`;
  }

  function mount() {
    if (!document.getElementById("iconSprite")) {
      document.body.insertAdjacentHTML("afterbegin", SPRITE);
    }
    document.querySelectorAll("[data-icon]").forEach((node) => {
      node.innerHTML = get(node.dataset.icon);
    });
  }

  mount();
  return { get, mount };
})();
