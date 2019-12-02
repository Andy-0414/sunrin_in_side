<template>
	<div id="app">
		<header class="header">
			<h1 class="title">
				<img src="./assets/logo1.png" alt />
			</h1>
			<div class="search">
				<input v-model="searchString" type="text" class="search__input" @keypress="enterPress" />
				<i class="material-icons" @click="search">search</i>
			</div>
		</header>
		<nav class="menu">
			<div class="menu__wrapper">
				<router-link tag="div" to="/" class="menu__item">선린 인 사이드</router-link>
				<router-link tag="div" to="/" class="menu__item">그룹 리스트</router-link>
			</div>
		</nav>
		<section class="content">
			<router-view />
		</section>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			searchString: ""
		};
	},
	created() {
		this.$store.dispatch("GET_PROFILE").then(user => {
			console.log(user);
		});
	},
	methods: {
		enterPress(e: KeyboardEvent) {
			if (e.keyCode == 13) this.search();
		},
		search() {
			this.$router.push({
				name: "search",
				query: {
					search: this.searchString
				}
			});
		}
	}
});
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;

	box-sizing: border-box;

	font-family: "Gulim";

	font-size: 14px;
}

#app {
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
    height: 100vh;

	.header {
		display: flex;
		justify-content: center;
		align-items: center;

		padding: 50px;
		h1.title {
			img {
				width: 400px;
			}
		}
		.search {
			height: fit-content;

			margin-right: 400px;

			background-color: #4a56a8;
			padding: 8px;

			display: flex;
			align-items: center;
			.search__input {
				border: none;
				background-color: white;
				font-size: 14px;
				padding: 9px;

				width: 400px;
			}
			i {
				font-size: 36px;
				margin-left: 10px;
				color: white;
			}
		}
	}
	.menu {
		width: 100vw;

		background-color: #4a56a8;
		border: 1px solid #3c4790;

		display: flex;
		justify-content: center;
		.menu__wrapper {
			width: 100%;
			max-width: 1200px;

			font-weight: bold;

			display: flex;
		}
		.menu__item {
			padding: 15px;
			color: white;
			cursor: pointer;
		}
	}
	.content {
		width: 100%;
		max-width: 1200px;
	}
}
@media (max-width: 1100px){
    .header{
        flex-direction: column;
        .search{
            margin-right: 0 !important;

            .search__input{
                width: 90% !important;
            }
        }
    }
}
</style>
