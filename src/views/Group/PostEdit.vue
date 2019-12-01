<template>
	<div class="postedit">
		<div class="posteidt__user">작성자 : {{getUser}}</div>
		<input v-model="title" type="text" placeholder="제목을 입력하세요" />
		<textarea v-model="content" rows="20" placeholder="내용을 입력하세요"></textarea>
		<div class="postedit__action">
			<div class="postedit__action__item" @click="$router.back()">취소</div>
			<div class="postedit__action__item" @click="postwrite">작성하기</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			title: "",
			content: ""
		};
	},
	methods: {
		postwrite() {
			this.$store
				.dispatch("WRITE_POST", {
					groupPk: this.getGroupPk,
					title: this.title,
					content: this.content
				})
				.then(data => {
					this.$router.push({
						name: "group/post",
						params: {
							postpk: data.pk
						}
					});
				})
				.catch(err => console.dir(err));
		}
	},
	computed: {
		getUser() {
			return this.$store.state.user;
		},
		getGroupPk() {
			return this.$route.params.pk;
		}
	}
});
</script>

<style lang="scss" scoped>
.postedit {
	width: 100%;

	border: 2px solid #d5d5d5;

	margin-top: 10px;
	padding: 20px;

	display: flex;
	flex-direction: column;
	.posteidt__user {
		margin-bottom: 10px;
		font-size: 16px;
	}
	input,
	textarea {
		padding: 8px;
		font-size: 16px;
	}
	input {
		font-weight: bold;
	}
	textarea {
		margin-top: 5px;
	}
	.postedit__action {
		display: flex;
		justify-content: flex-end;
		margin-top: 5px;

		.postedit__action__item {
			padding: 10px;
			padding-bottom: 0;
			font-size: 16px;

			cursor: pointer;
		}
		.postedit__action__item:nth-child(2) {
			color: #4a56a8;
			font-weight: bold;
		}
	}
}
</style>