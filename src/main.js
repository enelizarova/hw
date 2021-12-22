import {
  init,
  classModule,
  attributesModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

import { reactive, watchEffect } from "./reactive";

// https://github.com/snabbdom/snabbdom#key--string--number

const patch = init([
  classModule,
  attributesModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

const app = document.getElementById("app");
const list = document.querySelector(".users");

// eslint-disable-next-line no-unused-vars
const state = reactive({
  count: 0
});

const stateArray = reactive([
  {
    id: 1,
    pic: "aragorn",
    name: "Aragorn",
    position: "Aragorn was a Ranger of the North, first introduced with the name Strider and later revealed to be the heir of Isildur, King of Gondor"
  },
  {
    id: 2,
    pic: "gandalf",
    name: "Gandalf",
    position: "He is a wizard, one of the Istari order, and the leader and mentor of the Fellowship of the Ring"
  },
  {
    id: 3,
    pic: "galadriel",
    name: "Galadriel",
    position: "She was a royal Elf of both the Noldor and the Teleri, being a grandchild of both King Finwë and King Olwë"
  },
  {
    id: 4,
    pic: "elrond",
    name: "Elrond",
    position: "He is the bearer of the elven-ring Vilya, the Ring of Air, and master of Rivendell"
  },
  {
    id: 5,
    pic: "sauron",
    name: "Sauron",
    position: "chief lieutenant of the first Dark Lord, Morgoth. the absolute Satanic rebellion and evil of Morgoth and his satellite Sauron"
  },
  {
    id: 6,
    pic: "frodo",
    name: "Frodo Baggins",
    position: "a hobbit of the Shire who inherits the One Ring from his cousin"
  }
]);
let lastId = stateArray[stateArray.length - 1] ? stateArray[stateArray.length - 1].id + 1 : 1;

function getImageUrl(name) {
  return new URL(`./assets/img/${name}.jpg`, import.meta.url).href
}

function view(data) {
  return h("main", [
    h("div.content", [
      h("button.add", { on: { click: () => { addItem(data) } }}, "Add orc" ),
      h(
        "ul.users",
        data.map((user) => {
          return h(
            "li.user",
            [
              h("img.user__pic", {
                props: {
                  src: getImageUrl(user.pic),
                  alt: user.name,
                  width: "64",
                  height: "64"
                } 
              }),
              h("div.user__info", [
                h(
                  "h2.user__name",
                  user.name
                ),
                h(
                  "p.user__position",
                  user.position
                )
              ]
              ),
              h("button.user__delete", 
              { 
                on: { click: () => { removeItem(data, user.id) } }
              }, 
              [
                h("svg", {attrs: {width: 12, height: 12, viewBox: ["0 0 16 16"], stroke: "#8f8b97", 'stroke-width': 2, fill: "none"}}, [
                  h("line", {attrs: {x1: 0, y1: 0, x2: 16, y2: 16}}),
                  h("line", {attrs: {x1: 16, y1: 0, x2: 0, y2: 16}})
                ])
              ])
            ]
          );
        })
      )
    ])
  ]);
}

function removeItem(prewArr, id) {

  const users = prewArr.filter((user) => {
    if (user.id !== id) {
      return user;
    }
    return null;
  });
  render(users);
}

function addItem(data) {
    lastId++;
    data.unshift({
      name: "Orc " + Math.ceil(Math.random() * 100),
      pic: "orc" + Math.ceil(Math.random() * 5),
      id: lastId,
      position: "Orc"
    });
    render(data);
  }

function render(data) {
  previousVnode = patch(previousVnode, view(data));
}

let previousVnode = null;

watchEffect(() => {
  const vnode = view(stateArray);
  patch(previousVnode || app, vnode);
  previousVnode = vnode;
});
