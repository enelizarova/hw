import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h
} from "snabbdom";

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
]);

const users = [
  {
    pic: "aragorn",
    name: "Aragorn",
    position: "Aragorn was a Ranger of the North, first introduced with the name Strider and later revealed to be the heir of Isildur, King of Gondor"
  },
  {
    pic: "gandalf",
    name: "Gandalf",
    position: "He is a wizard, one of the Istari order, and the leader and mentor of the Fellowship of the Ring"
  },
  {
    pic: "galadriel",
    name: "Galadriel",
    position: "She was a royal Elf of both the Noldor and the Teleri, being a grandchild of both King Finwë and King Olwë"
  },
  {
    pic: "elrond",
    name: "Elrond",
    position: "He is the bearer of the elven-ring Vilya, the Ring of Air, and master of Rivendell"
  },
  {
    pic: "sauron",
    name: "Sauron",
    position: "chief lieutenant of the first Dark Lord, Morgoth. the absolute Satanic rebellion and evil of Morgoth and his satellite Sauron"
  },
  {
    pic: "frodo",
    name: "Frodo Baggins",
    position: "a hobbit of the Shire who inherits the One Ring from his cousin"
  }
]
function getImageUrl(name) {
  return new URL(`./assets/img/${name}.jpg`, import.meta.url).href
}
function view() {
  return h("div.main", [
    h("div.content", [
      h(
        "ul.users",
        users.map((user) => {
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
              h("div", [
                h(
                  "h2.user__name",
                  user.name
                ),
                h(
                  "p.user__position",
                  user.position
                )
              ]
              )
            ]
          );
        })
      )
    ])
  ]);
}

const app = document.getElementById("app");

patch(app, view(users));
