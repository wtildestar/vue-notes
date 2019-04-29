import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import AddNote from "@/components/AddNote";
import EditNote from "@/components/EditNote";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/add-note",
      name: "AddNote",
      component: AddNote
    },
    {
      path: "/edit-note/:note",
      alias: "/edit-note/:note/:id?",
      name: "EditNote",
      component: EditNote
    }
  ]
});
