import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: "",
		isSuperUser: false,
		mainPath: "http://andy0414.com:8000"
	},
	mutations: {
		setUser(state, data) {
			state.user = data;
		}
	},
	actions: {
		LOGIN({ state, commit }, data): Promise<string> {
			return new Promise<string>((resolve, reject) => {
				axios
					.post(state.mainPath + "/users/login/", data)
					.then(data => {
						if (data.data.result) {
							commit("setUser", data.data.username);
							resolve(data.data.username);
						} else {
							reject("");
						}
					})
					.catch(err => alert("로그인 실패"));
			});
		},
		LOGOUT({ state, commit }, data): Promise<boolean> {
			return new Promise<boolean>((resolve, reject) => {
				axios
					.post(state.mainPath + "/users/logout/", data)
					.then(data => {
						commit("setUser", "");
						resolve(true);
					})
					.then(err => reject(err));
			});
		},
		REGISTER({ state, commit }, data): Promise<boolean> {
			return new Promise<boolean>((resolve, reject) => {
				axios
					.post(state.mainPath + "/users/register/", data)
					.then(data => {
						if (data.data.result) {
							resolve(true);
						} else {
							reject(false);
						}
					})
					.catch(err => alert("회원가입 실패"));
			});
		},
		GET_PROFILE({ state, commit }, data): Promise<boolean> {
			return new Promise<boolean>((resolve, reject) => {
				axios
					.post(state.mainPath + "/users/getProfile/", data, {
						withCredentials: true
					})
					.then(data => {
						commit("setUser", data.data.username);
						resolve(data.data.username);
					})
					.catch(err => reject(err));
			});
		},

		GET_GROUPS({ state, commit }, data): Promise<Object[]> {
			return new Promise<Object[]>((resolve, reject) => {
				axios
					.get(state.mainPath + "/groups/group/", data)
					.then(data => {
						resolve(data.data);
					})
					.catch(err => reject(err));
			});
		},
		GET_GROUP({ state, commit }, data): Promise<Object> {
			return new Promise<Object>((resolve, reject) => {
				axios
					.get(state.mainPath + "/groups/group/" + data + "/")
					.then(data => {
						resolve(data.data);
					})
					.catch(err => reject(err));
			});
		},
		GET_ALL_POSTS({ state, commit }, data): Promise<Object[]> {
			return new Promise<Object[]>((resolve, reject) => {
				axios
					.get(state.mainPath + "/groups/posts/")
					.then(data => {
						resolve(data.data);
					})
					.catch(err => reject(err));
			});
		},
		GET_POSTS({ state, commit }, data): Promise<Object[]> {
			return new Promise<Object[]>((resolve, reject) => {
				axios
					.get(state.mainPath + "/groups/posts/" + data + "/")
					.then(data => {
						resolve(data.data);
					})
					.catch(err => reject(err));
			});
		},
		GET_POST({ state, commit }, data): Promise<Object> {
			return new Promise<Object>((resolve, reject) => {
				axios
					.get(state.mainPath + "/groups/posts/" + data.groupPk + "/" + data.postPk + "/")
					.then(data => {
						resolve(data.data);
					})
					.catch(err => reject(err));
			});
		},
		GET_POST_COMMENTS({ state, commit }, data): Promise<Object> {
			return new Promise<Object>((resolve, reject) => {
				axios
					.get(state.mainPath + "/groups/posts/" + data + "/comment/")
					.then(data => {
						resolve(data.data);
					})
					.catch(err => reject(err));
			});
		},
		WRITE_POST({ state, commit }, data): Promise<Object> {
			return new Promise<Object>((resolve, reject) => {
				axios
					.post(
						state.mainPath + "/groups/posts/" + data.groupPk + "/",
						{
							title: data.title,
							content: data.content,
							visit: 0,
							recommend: 0,
							group: 1
						},
						{
							withCredentials: true
						}
					)
					.then(data => {
						resolve(data.data);
					})
					.catch(err => reject(err));
			});
		},
		RECOMMEND_POST({ state, commit }, data): Promise<Object> {
			return new Promise<Object>((resolve, reject) => {
				axios
					.post(state.mainPath + "/groups/posts/" + data.groupPk + "/" + data.postPk + "/", null, {
						withCredentials: true
					})
					.then(data => {
						resolve(data.data);
					})
					.catch(err => reject(err));
			});
		},
		REMOVE_POST({ state, commit }, data): Promise<Object> {
			return new Promise<Object>((resolve, reject) => {
				axios
					.delete(state.mainPath + "/groups/posts/" + data.groupPk + "/" + data.postPk + "/", {
						withCredentials: true
					})
					.then(data => {
						resolve(data.data);
					})
					.catch(err => reject(err));
			});
		},
		WRITE_COMMENT({ state, commit }, data): Promise<Object> {
			return new Promise<Object>((resolve, reject) => {
				axios
					.post(
						state.mainPath + "/groups/posts/" + data.postPk + "/comment/",
						{
							content: data.content,
							post: data.postPk
						},
						{
							withCredentials: true
						}
					)
					.then(data => {
						resolve(data.data);
					})
					.catch(err => reject(err));
			});
		}
	},
	modules: {}
});
