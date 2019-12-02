<template>
	<div class="group__list">
		<div class="group__posttype">
			<div class="group__posttype__left">
				<div
					class="group__posttype__item"
					:class="{'group__posttype__item-selected':type == 0}"
					@click="type = 0"
				>전체글</div>
				<div
					class="group__posttype__item"
					:class="{'group__posttype__item-selected':type == 1}"
					@click="type = 1"
				>추천글</div>
			</div>
		</div>
		<table class="group__postlist">
			<thead>
				<tr>
					<th>번호</th>
					<th>제목</th>
					<th>작성자</th>
					<th>조회수</th>
					<th>추천</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="post in getPosts"
					:key="post.pk"
					@click="$router.push({name : 'group/post',params:{postpk:post.pk}})"
				>
					<td>{{post.pk}}</td>
					<td class="posticontd">
						<i
							class="posticon material-icons"
							:class="{'recommend':post.recommend > 5}"
						>{{ post.recommend > 5 ? 'stars' : 'chat'}}</i>
						{{post.title}}
					</td>
					<td>{{post.owner}}</td>
					<td>{{post.visit}}</td>
					<td>{{post.recommend}}</td>
				</tr>
			</tbody>
		</table>
		<div class="group__posttype">
			<div class="group__posttype__left">
				<div
					class="group__posttype__item"
					:class="{'group__posttype__item-selected':type == 0}"
					@click="type = 0"
				>전체글</div>
				<div
					class="group__posttype__item"
					:class="{'group__posttype__item-selected':type == 1}"
					@click="type = 1"
				>추천글</div>
			</div>
			<router-link
				tag="div"
				:to="{'name':'group/postedit'}"
				class="group__posttype__right"
				v-if="getUser"
			>
				<div class="group__posttype__item group__posttype__item-selected">글쓰기</div>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			posts: [] as any[],
			type: 0
		};
	},
	created() {
		this.$store
			.dispatch("GET_POSTS", this.getGroupPk)
			.then(data => {
				this.posts = data.reverse();
			})
			.catch(err => this.$router.back());
	},
	computed: {
		getUser() {
			return this.$store.state.user;
		},
		getGroupPk() {
			return this.$route.params.pk;
		},
		getPosts(): any[] {
			if (this.type == 0) {
				return this.posts;
			} else {
				return this.posts.filter((x: any) => x.recommend > 5);
			}
		}
	}
});
</script>

<style lang="scss" scoped>
.group__posttype {
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
	.group__posttype__left {
		display: flex;
	}
	.group__posttype__item {
		border-radius: 2px;
		padding: 6px 20px;
		margin-right: 5px;
		border: 2px solid #cccccc;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;
		&:hover {
			border: 2px solid #4a56a8;
		}
	}
	.group__posttype__item-selected {
		color: white;
		background-color: #4a56a8;
		border: 2px solid #4a56a8;
	}
}
.group__postlist {
	margin-top: 20px;
	border-top: 3px solid #4a56a8;
	border-collapse: collapse;
	width: 100%;
	thead {
		border-bottom: 2px solid #4a56a8;
		th {
			padding: 8px;
			font-size: 12px;
		}
		th:nth-child(3) {
			width: 200px;
		}
		th:nth-child(1),
		th:nth-child(4),
		th:nth-child(5) {
			width: 60px;
		}
	}
	tbody {
		border-bottom: 2px solid #4a56a8;
		tr {
			border-bottom: 1px solid #eeeeee;
            cursor: pointer;
		}
		td {
			padding: 7.5px;
			text-align: center;
			font-size: 16px;
		}
		td:nth-child(2) {
			text-align: left;
		}
		.posticontd {
			display: flex;
			align-items: center;
		}
		.posticon {
			color: #aaaaaa;
			font-size: 20px;
			margin-right: 8px;
			&.recommend {
				color: #4a56a8;
			}
		}
	}
}
</style>