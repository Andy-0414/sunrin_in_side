<template>
	<div class="group">
		<div class="group__title">{{group.name}} 그룹</div>
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			group: {},
		};
	},
	created() {
		this.$store
			.dispatch("GET_GROUP", this.getGroupPk)
			.then(data => {
				this.group = data;
			})
            .catch(err => this.$router.back());
	},
	computed: {
		getGroupPk() {
			return this.$route.params.pk;
		}
	}
});
</script>

<style lang="scss" scoped>
.group {
	width: 100%;
	.group__title {
		padding: 15px;
		font-size: 24px;
		font-weight: bold;
		color: #4a56a8;

		border-bottom: 2px solid #4a56a8;
	}
}
</style>