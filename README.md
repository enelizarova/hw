# vue2-homework-part1

## Задание

Используя Virtual DOM нужно отобразить список пользователей в браузере по макету. В качестве реализации Virtual DOM используйте библиотеку [snabbdom](https://github.com/snabbdom/snabbdom). Весь код можно написать в `main.js` или разделить на файлы по усмотрению разработчика.

Для создания виртуальных узлов используйте функцию `h` из библиотеки `snabbdom`. Пример:

```javascript
import { h } from "snabbdom";

const vnode = h("div", { style: { color: "#000" } }, [
  h("h1", "Headline"),
  h("p", "A paragraph"),
]);
```

В проекте должны без ошибок выполняться команды `npm run build` и `npm run preview`.


Макет:
![Screen](./screen.png)

*Комментарий к макету: Список пользователей должен отображаться по центру экрана. Для аватарок используйте локальные изображения из папки assets, а не из public.*
