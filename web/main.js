// The unix theme style (web/style.css) is on ONLY with a unix theme active: the plugin puts the unix-theme class on
// <html> when a theme of this plugin or a personal unix theme is chosen (an id with "unix-" or a name "Unix ·…").
// In "System" and other themes the class is absent and the page is standard. The hub keeps the chosen theme in
// localStorage hub.theme and sends a hub-theme event on change; if that ever changes, the style just does not turn on
// (the theme stays).
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
  window.addEventListener("hub-theme", sync);   // the theme was changed in Settings or by a link
  window.addEventListener("storage", (e) => { if (e.key === "hub.theme") sync(); });   // another tab
}
