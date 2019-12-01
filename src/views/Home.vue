<template>
	<div class="home">
		<div class="home__recommend">
			<h2 class="home__recommend__subtitle">그룹 리스트</h2>
			<div class="home__recommend__list">
				<GroupCardView
					class="home__recommend__item"
					v-for="group in gropus"
					:key="group.name"
					:data="group"
				></GroupCardView>
			</div>
		</div>
		<div class="home__login">
			<div class="home__login__box" v-if="!getUser">
				<div class="home__login__box__wrapper">
					<div class="home__login__box__left">
						<input v-model="username" type="text" placeholder="유저 이름"/>
						<input v-model="password" type="password" placeholder="유저 비밀번호"/>
					</div>
					<div class="home__login__box__right">
						<button @click="login">로그인</button>
					</div>
				</div>
				<div class="home__login__register" @click="register">이 정보로 회원 가입 하기</div>
			</div>
			<div class="home__login__profile" v-else>
				<div class="home__login__profile__username">{{getUser}}</div>
				<br />
				<div class="home__login__logout" @click="logout">로그아웃</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import PostCardView from "@/components/PostCardView.vue";
import GroupCardView from "@/components/GroupCardView.vue";
export default Vue.extend({
	components: {
		PostCardView,
		GroupCardView
	},
	data() {
		return {
            gropus: [],
            username : "",
            password : ""
		};
	},
	created() {
		this.$store.dispatch("GET_GROUPS").then(groups => {
			this.gropus = groups;
		});
	},
	methods: {
		login() {
			this.$store
				.dispatch("LOGIN", {
					username: this.username,
					password: this.password
				})
				.then(data => {
                    alert("로그인 성공")
				})
				.catch(err => {
					console.log(err);
				});
		},
		register() {
			this.$store
				.dispatch("REGISTER", {
					username: this.username,
					password: this.password
				})
				.then(data => {
                    alert("회원가입 성공")
                    this.username = ""
                    this.password = ""
				})
				.catch(err => {
					console.log(err);
				});
		},
		logout() {
			this.$store
				.dispatch("LOGOUT")
				.then(data => {})
				.catch(err => console.log(err));
		}
	},
	computed: {
		getUser() {
			return this.$store.state.user;
		}
	}
});
</script>

<style lang="scss" scoped>
.home {
	width: 100%;
	height: 500px;

	display: flex;
	& > * {
		margin: 10px;
	}
	.home__recommend {
		flex: 3;

		display: flex;
		flex-direction: column;

		.home__recommend__subtitle {
			font-size: 16px;
			border-bottom: 2px solid #4a56a8;
			padding: 10px;
			color: #4a56a8;
		}
		.home__recommend__list {
			display: flex;
			flex-wrap: wrap;
		}
	}
	.home__login {
		flex: 1;

		.home__login__box {
			display: flex;
			flex-direction: column;
			border: 1px solid #3c4790;
			.home__login__box__wrapper {
				display: flex;
			}
			input {
				background-color: #eeeeee;
				border: none;
				padding: 10px;
				width: 100%;
			}
			input:first-child {
				margin-bottom: 10px;
			}
			.home__login__box__left {
				flex: 3;
				margin: 15px;
			}
			.home__login__box__right {
				flex: 1;
				margin: 15px;
				margin-left: 0;

				button {
					width: 100%;
					height: 100%;

					border: none;
					background-color: #4a56a8;

					font-weight: bold;
					color: white;
				}
			}
			.home__login__register {
				padding: 10px;
				padding-top: 0;
				font-weight: bold;
				cursor: pointer;
			}
		}
		.home__login__profile {
			border: 1px solid #3c4790;
			padding: 10px;
			.home__login__profile__username {
				font-size: 18px;
				font-weight: bold;
			}
			.home__login__logout {
				font-weight: bold;
				cursor: pointer;
			}
		}
	}
}
</style>
