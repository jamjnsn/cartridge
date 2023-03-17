<template>
	<VueFeather :type="type" size="1em" class="ui-icon" />
</template>

<script setup lang="ts">
import VueFeather from 'vue-feather'

const props = defineProps({
	type: String
})
</script>
