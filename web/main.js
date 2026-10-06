// Запасной значок для эмодзи сессий, которых нет в avatars темы (d7291): пока выбрана unix-тема, цветной эмодзи
// в списке сессий заменяется первой буквой имени сессии — шрифтом и цветом темы. Код хаба не трогаем.
const MARK = "uxFallback";

function unixThemeOn() {
  try { return String(JSON.parse(localStorage.getItem("hub.theme") || "null")?.theme?.name || "").startsWith("Unix ·"); }
  catch { return false; }
}

function letterOf(av) {
  const nm = av.closest(".nm");
  const text = nm ? [...nm.childNodes].filter((n) => n !== av).map((n) => n.textContent).join("").trim() : "";
  const ch = [...text].find((c) => /[\p{L}\p{N}]/u.test(c));
  return ch ? ch.toLowerCase() : "•";
}

function scan() {
  const on = unixThemeOn();
  for (const av of document.querySelectorAll("span.avatar")) {
    if (av.classList.contains("kit-img")) continue;   // у темы есть картинка — её и показываем
    if (on && !av.dataset[MARK]) {
      av.dataset[MARK] = av.textContent;
      av.textContent = letterOf(av);
      av.classList.add("ux-fallback");
      av.title = av.dataset[MARK];
    } else if (!on && av.dataset[MARK]) {
      av.textContent = av.dataset[MARK];
      delete av.dataset[MARK];
      av.classList.remove("ux-fallback");
      av.removeAttribute("title");
    }
  }
}

export default function register(hub) {
  hub.addStyle("web/fallback.css");
  let queued = false;
  const later = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; scan(); }); } };
  new MutationObserver(later).observe(document.body, { childList: true, subtree: true });
  window.addEventListener("hub-theme", later);
  later();
}
