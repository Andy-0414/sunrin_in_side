<template>
	<div class="search">
		<h2 class="search__subtitle">그룹 리스트</h2>
		<div class="search__list">
			<GroupCardView
				class="search__grouplist__item"
				v-for="group in getGroups"
				:key="group.name"
				:data="group"
			></GroupCardView>
		</div>
		<h2 class="search__subtitle">게시글 리스트</h2>
		<div class="search__list">
			<PostCardView
				class="search__grouplist__item"
				v-for="post in getPosts"
				:key="post.name"
				:data="post"
			></PostCardView>
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
			groups: [],
			posts: []
		};
	},
	created() {
		this.$store.dispatch("GET_GROUPS").then(groups => {
			this.groups = groups;
		});
		this.$store.dispatch("GET_ALL_POSTS").then(posts => {
			this.posts = posts;
		});
	},
	computed: {
		getSearchString() {
			return this.$route.query.search;
		},
		getGroups(): Object[] {
			return this.groups.filter(
				(group: any) => group.name.indexOf(this.getSearchString) != -1
			);
		},
		getPosts(): Object[] {
			return this.posts.filter(
				(post: any) => post.title.indexOf(this.getSearchString) != -1
			);
		}
	}
});
</script>
<style lang="scss" scoped>
.search {
	.search__subtitle {
		font-size: 16px;
		border-bottom: 2px solid #4a56a8;
		padding: 10px;
		color: #4a56a8;
		margin-top: 10px;
	}
	.search__list {
		display: flex;
		flex-wrap: wrap;
	}
}
</style>