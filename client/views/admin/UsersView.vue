<script setup lang="ts">
import AdminLayout from '@/components/layouts/AdminLayout.vue'
import type { User } from '@prisma/client'
import { ref, onMounted } from 'vue'
import useAxios from '@/utils/useAxios';

const loadingUsers = ref(true)
const users = ref<User[]>([])

const axios = useAxios()

onMounted(async () => {
	await axios.get('/api/users').then((res) => {
		users.value = res.data
		loadingUsers.value = false
	})
})
</script>

<template>
	<AdminLayout>
		<h1 class="title">Users</h1>

		<table>
			<thead>
				<th>ID</th>
				<th>Username</th>
				<th>Role</th>
				<th class="controls"></th>
			</thead>

			<tbody>
				<tr v-for="(user, index) in users" v-bind:key="index">
					<td>{{ user.id }}</td>
					<td>{{ user.username }}</td>
					<td>{{ user.isAdmin ? 'Admin' : 'User' }}</td>
					<td class="controls">
						<RouterLink
							:to="{
								name: 'admin-users-edit',
								params: { id: user.id }
							}"
						>
							<feather-icon type="edit" />
						</RouterLink>

						<RouterLink to="/" class="delete-button">
							<feather-icon type="trash" />
						</RouterLink>
					</td>
				</tr>
			</tbody>
		</table>
	</AdminLayout>
</template>

<style scoped lang="scss">
.controls {
	text-align: center;
	width: 100px;
	white-space: nowrap;

	a {
		transition: all 0.1s ease-in-out;
		filter: drop-shadow(0 0 0 transparent);

		&:not(:last-child) {
			margin-right: 0.25em;
		}

		&:hover {
			color: $secondary;

			filter: drop-shadow(0 0.1em 0.2em currentColor);
		}

		&.delete-button {
			&:hover {
				color: $bad;
			}
		}
	}
}
</style>
