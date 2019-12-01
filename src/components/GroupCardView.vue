<template>
    <div class="groupcardview" @click="$router.push(`/group/${data.pk}`)">
        <div class="groupcardview__imagewrapper">
            <img src="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="">
        </div>
        <div class="groupcardview__contentwrapper">
            <h3 class="title">{{data.name}}</h3>
            <p class="owner">{{data.owner}}</p>
            <p class="information">방문 : {{data.visit}}</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props:{
        data : Object
    }
})
</script>

<style lang="scss" scoped>
@mixin text-nowrap() {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.groupcardview{
    display: flex;
    flex-direction: column;
    width: 240px;
    margin: 10px;
    cursor: pointer;

    .groupcardview__imagewrapper{
        flex: 1;
        img{
            width: 100%;
        }
    }

    .groupcardview__contentwrapper{
        display: flex;
        flex-direction: column;

        padding: 5px;
        h3.title{
            margin: 5px 0;
            @include text-nowrap();
        }
        p.owner{
            margin-bottom: 10px;
            @include text-nowrap();
        }
        p.information{
        }
    }
}
</style>