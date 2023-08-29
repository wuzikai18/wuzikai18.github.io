<template>
    <div class="aside-list" :class="{ 'active' : active }">
        <span class="truncate"><slot/></span>
    </div>
</template>
<script setup>
defineProps({
    active:{
        type:Boolean,
        default:false
    }
})

defineEmits(["edit","delete"])
</script>
<style>
.aside-list{
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
    @apply flex items-center p-3 text-sm text-gray-600;
}
.aside-list:hover,.active{
    @apply bg-blue-50;
}
</style>