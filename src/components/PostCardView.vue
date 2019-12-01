<template>
	<div
		class="postcardview"
		@click="$router.push({name:'group/post',params:{
        pk:data.group,postpk:data.pk}})"
	>
		<div class="postcardview__contentwrapper">
			<h3 class="title">{{data.title}}</h3>
			<p class="owner">{{data.owner}}</p>
			<p class="information">추천 {{data.recommend}}</p>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	props: {
		data: Object
	}
});
</script>

<style lang="scss" scoped>
@mixin text-nowrap() {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.postcardview {
	display: flex;
	flex-direction: column;
	width: 240px;
	margin: 10px;

	.postcardview__contentwrapper {
		display: flex;
		flex-direction: column;

		padding: 5px;
		h3.title {
			margin: 5px 0;
			@include text-nowrap();
		}
		p.owner {
			margin-bottom: 10px;
			@include text-nowrap();
		}
		p.information {
		}
	}
}
</style>