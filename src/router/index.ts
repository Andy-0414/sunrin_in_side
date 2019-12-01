import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import Group from "../views/Group.vue";
import List from "../views/Group/List.vue";
import PostEdit from "../views/Group/PostEdit.vue";
import Post from "../views/Group/Post.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: Home
    },
    {
		path: "/search",
		name: "search",
		component: Search
	},
	{
		path: "/group/:pk",
		name: "group",
		component: Group,
		children: [
			{
				path: "",
				name: "group/list",
				component: List
			},
			{
				path: "postedit",
				name: "group/postedit",
				component: PostEdit
			},
			{
				path: ":postpk",
				name: "group/post",
				component: Post
			}
		]
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
