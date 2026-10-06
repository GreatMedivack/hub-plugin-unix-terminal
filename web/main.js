// Стиль unix-тем (web/style.css) включается ТОЛЬКО при активной unix-теме: плагин ставит на <html>
// класс unix-theme, когда выбрана тема этого плагина или личная unix-тема (id с «unix-» или имя «Unix ·…»).
// В «Системной» и чужих темах класса нет — страница стандартная. Выбранную тему хаб хранит в localStorage hub.theme
// и при смене шлёт событие hub-theme; если это когда-нибудь поменяется, стиль просто не включится (тема останется).
function isUnix() {
  try {
    const t = JSON.parse(localStorage.getItem("hub.theme") || "null");
    return !!t && (/(^|[:/])unix-/.test(String(t.id || "")) || String(t.theme?.name || "").startsWith("Unix ·"));
  } catch { return false; }
}
const sync = () => document.documentElement.classList.toggle("unix-theme", isUnix());

export default function register(hub) {
  hub.addStyle("web/style.css");
  sync();
  window.addEventListener("hub-theme", sync);   // сменили тему в «Настройках» или ссылкой
  window.addEventListener("storage", (e) => { if (e.key === "hub.theme") sync(); });   // другая вкладка
}
