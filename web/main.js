// Только стиль (web/style.css): при теме со шрифтом на всю страницу (класс theme-font-all на <html>) «ждёт вас» —
// пунктирной рамкой и полосой цветом темы, участники ленты и значки меню — цветом темы. Другие темы не меняются.
export default function register(hub) {
  hub.addStyle("web/style.css");
}
