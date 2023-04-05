<template>
	<AdminLayout>
		<template #header>
			<h1>Library</h1>
			<div class="buttons">
				<a
					class="button is-small is-primary"
					:class="{ 'is-scanning': isScanning, 'is-disabled': isScanning }"
					@click="startScan"
				>
					<template v-if="isScanning">
						<inline-svg :src="logo" class="spinner" />
					</template>

					<FeatherIcon type="refresh-cw" />
					<span>Scan</span>
				</a>
			</div>
		</template>

		<div>
			<h2 class="heading">Unmatched Files</h2>
			<p>Please try renaming the file and try scanning again.</p>

			<div v-for="(file, index) in unmatchedFiles" :key="index" class="unmatched-file">
				{{ file.path }}
			</div>
		</div>
	</AdminLayout>
</template>

<script setup lang="ts">
import { File, Game, Platform } from '@prisma/client'
import logo from '@/assets/images/spinner.svg'
import { onMounted } from 'vue'

const axios = useAxios()

const isScanning = ref(false)
const unmatchedFiles = ref<any[]>([])

const getUnmatched = () => {
	return axios
		.get('/api/library/unmatched')
		.then((res) => {
			unmatchedFiles.value = res.data
		})
		.catch((e) => {
			console.log(e)
		})
}

const startScan = () => {
	isScanning.value = true

	axios
		.get('/api/library/scan')
		.then((res) => {
			console.log('Completed library scan')
		})
		.then(getUnmatched)
		.finally(() => {
			isScanning.value = false
		})
		.catch((e) => {
			console.log(e)
		})
}

onMounted(async () => {
	await getUnmatched()
})
</script>

<style scoped lang="scss">
.spinner {
	height: 15px;
	width: auto;
}

.is-scanning {
	.vue-feather,
	span {
		opacity: 0;
	}

	.spinner {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}

.unmatched-file {
	background-color: $grey-darker;

	border-radius: 0.2em;
	padding: 0.5rem;

	&:not(:last-child) {
		margin-bottom: 0.25rem;
	}
}
</style>
