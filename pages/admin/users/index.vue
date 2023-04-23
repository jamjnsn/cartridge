<script setup lang="ts">
import { User } from '@prisma/client'

const { data: users } = await useFetch<User[]>('/api/users', {
	headers: {
		authorization: getAuthHeader()
	},
	method: 'GET'
})

definePageMeta({
	layout: 'admin'
})
</script>

<template>
	<div>
		<AdminHeader>
			<h1>Users</h1>
			<div class="controls">
				<NuxtLink to="/admin/users/new">
					<UiButton
						color="primary"
						size="small"
						icon="user-plus"
					>
						New
					</UiButton></NuxtLink
				>
			</div>
		</AdminHeader>

		<UiFlexGrid class="admin-user-list">
			<NuxtLink
				v-for="user in users"
				:key="user.id"
				:to="`users/${user.id}`"
			>
				<UiCard class="admin-user-card">
					<div
						v-if="user.isAdmin"
						class="admin-user-card__admin"
					>
						<UiIcon type="key" />
					</div>

					<span>{{ user.username }}</span>

					<!-- <template #footer>
					<NuxtLink
						to="/"
						class="card__footer-item"
						><UiIcon type="edit" /> Edit</NuxtLink
					>
					<NuxtLink
						to="/"
						class="card__footer-item"
						><UiIcon type="trash" /> Delete</NuxtLink
					>
				</template> -->
				</UiCard>
			</NuxtLink>
		</UiFlexGrid>
	</div>
</template>

<style lang="scss">
.admin-user-list {
	& > * {
		width: 200px;
	}
}

.admin-user-card {
	&__admin {
		display: flex;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		padding: 0.5rem;
		color: $grey-light;

		.icon {
			margin-right: 0.25em;
		}
	}
}
</style>
