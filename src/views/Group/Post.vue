<template>
	<div class="post">
		<div class="post__head">
			<h4>{{post.title}}</h4>
			<p>
				{{post.owner}}
				<span class="date">| {{getDate}}</span>
				<span class="delete" v-if="post.owner == getUser" @click="removepost">삭제하기</span>
			</p>
		</div>
		<p class="post__content">{{post.content}}</p>
		<div class="post__recommend" @click="recommend">
			<i class="material-icons">stars</i>
			추천 ({{post.recommend}})
		</div>
		<div class="post__comment">
			<div class="post__comment__title">전체 댓글 {{comments.length}}개</div>
			<div class="post__comment__create">
				<input v-model="createContent" type="text" placeholder="댓글을 작성해 보세요" @keydown="enterPress" />
				<button @click="commentwrite">작성</button>
			</div>
			<div class="post__comment__list">
				<div class="post__comment__list__item" v-for="comment in comments" :key="comment.pk">
					<div class="owner">{{comment.owner}}</div>
					<div class="content">{{comment.content}}</div>
					<div class="created_at">{{new Date(comment.created_at).toLocaleString()}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			post: {} as any,
			comments: [] as Object[],
			createContent: ""
		};
	},
	created() {
		this.postReload();
		this.commentReload();
	},
	methods: {
		enterPress(e: KeyboardEvent) {
			if (e.keyCode == 13) this.commentwrite();
		},
		commentwrite() {
			this.$store
				.dispatch("WRITE_COMMENT", {
					postPk: this.getPostPk,
					content: this.createContent
				})
				.then(data => {
					this.commentReload();
				})
				.catch(err => console.dir(err));
		},
		recommend() {
			this.$store
				.dispatch("RECOMMEND_POST", {
					groupPk: this.getGroupPk,
					postPk: this.getPostPk
				})
				.then(data => {
					this.postReload();
				})
				.catch(err => console.dir(err));
		},
		removepost() {
			this.$store
				.dispatch("REMOVE_POST", {
					groupPk: this.getGroupPk,
					postPk: this.getPostPk
				})
				.then(data => {
					this.$router.back();
				})
				.catch(err => console.dir(err));
		},
		postReload() {
			this.$store
				.dispatch("GET_POST", {
					groupPk: this.getGroupPk,
					postPk: this.getPostPk
				})
				.then(data => {
					this.post = data;
				})
				.catch(err => console.dir(err));
		},
		commentReload() {
			this.createContent = "";
			this.$store
				.dispatch("GET_POST_COMMENTS", this.getPostPk)
				.then(data => {
					this.comments = data.reverse();
				})
				.catch(err => console.dir(err));
		}
	},
	computed: {
		getGroupPk() {
			return this.$route.params.pk;
		},
		getPostPk() {
			return this.$route.params.postpk;
		},
		getDate(): string {
			if (this.post.created_at)
				return new Date(this.post.created_at).toLocaleString();
			else return "";
		},
		getUser() {
			return this.$store.state.user;
		}
	}
});
</script>

<style lang="scss" scoped>
.post {
	.post__head {
		padding: 10px 5px;
		border-bottom: 1px solid #eeeeee;
		.delete {
			margin-left: 20px;
			color: #ff6666;
			cursor: pointer;
		}
		h4 {
			font-size: 18px;
		}
		p {
			margin-top: 5px;
			font-size: 14px;
			span.date {
				color: #aaaaaa;
			}
		}
	}
	.post__content {
		margin-top: 10px;
		padding: 5px;
		min-height: 400px;
	}
	.post__recommend {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #4a56a8;
		font-weight: bold;

		cursor: pointer;
		user-select: none;

		i {
			font-size: 64px;
		}
	}
	.post__comment {
		.post__comment__title {
			font-weight: bold;
			padding: 5px;
			margin-top: 40px;
			border-bottom: 2px solid #4a56a8;
		}
		.post__comment__create {
			display: flex;

			padding: 10px;

			input {
				padding: 10px;
				margin-right: 10px;
				flex: 1;

				border: 1px solid #4a56a8;
			}
			button {
				border: 1px solid #aaaaaa;
				width: 80px;
				background: none;
				font-weight: bold;
			}
		}
		.post__comment__list {
			margin-bottom: 50px;
			.post__comment__list__item {
				border-bottom: 1px solid #eeeeee;
				padding: 10px;

				display: flex;
				justify-content: space-between;

				.owner {
					width: 150px;
					white-space: nowrap;
					overflow-x: hidden;
					text-overflow: ellipsis;
				}
				.created_at {
					width: 260px;
					text-align: right;
				}
			}
		}
	}
}
</style>