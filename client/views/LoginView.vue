<template>
	<AuthLayout>
		<div class="panel">
			<header class="panel-header">Login</header>

			<div class="panel-body">
				<form @submit="submit">
					<div class="field">
						<label><feather-icon type="user" /> Username</label>
						<input type="text" />
					</div>

					<div class="field">
						<label><feather-icon type="lock" /> Password</label>
						<input type="password" />
					</div>

					<div class="buttons">
						<button class="button is-primary"><feather-icon type="play" /> Start</button>
					</div>
				</form>
			</div>
		</div>
	</AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '../components/layouts/AuthLayout.vue'

const submit = (e: any) => {
	e.preventDefault()
	console.log('Submit')
}
</script>

<style scoped lang="scss">
.panel {
	width: 300px;
	max-width: 100%;
	margin: 1rem;
}
</style>
