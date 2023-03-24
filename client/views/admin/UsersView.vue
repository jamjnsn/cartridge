<script setup lang="ts">
import AdminLayout from '@/components/layouts/AdminLayout.vue'
import type { User } from '@prisma/client'
import { ref, onMounted } from 'vue'
import useAxios from '@/utils/useAxios'

const loadingUsers = ref(true)
const users = ref<User[]>([])

const axios = useAxios()

const userToDelete = ref<User | null>(null)

const promptDeleteUser = (user: User) => {
	userToDelete.value = user
}

const deleteUser = (user: User | null) => {
	if (user === null) return

	axios
		.delete(`/api/users/${user.id}`)
		.then((res) => {
			console.log(res)
		})
		.catch((e) => {
			console.log(e)
		})
}

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
		<div class="buttons">
			<RouterLink to="/admin/users/create" class="button is-small">
				<feather-icon type="plus" /> Create
			</RouterLink>
		</div>

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

						<a class="delete-button" @click="promptDeleteUser(user)" v-if="user.id !== '1'">
							<!-- Don't show delete button for admin -->
							<feather-icon type="trash" />
						</a>
					</td>
				</tr>
			</tbody>
		</table>

		<div class="delete-confirmation centered-overlay has-background" v-if="userToDelete !== null">
			<div class="close-overlay" @click="userToDelete = null"></div>
			<div class="panel">
				<header class="panel-header">Are you sure?</header>

				<div class="panel-body">
					<div class="buttons">
						<button class="button is-bad" @click="deleteUser(userToDelete)">
							Delete {{ userToDelete?.username }}
						</button>
						<button class="button" @click="userToDelete = null">Cancel</button>
					</div>
				</div>
			</div>
		</div>
	</AdminLayout>
</template>

<style scoped lang="scss">
.delete-confirmation {
	.panel {
		width: 300px;
		max-width: 100%;
	}
}

.close-overlay {
	position: absolute;
	width: 100%;
	height: 100%;
}

.controls {
	text-align: center;
	width: 100px;
	white-space: nowrap;

	a {
		transition: all 0.1s ease-in-out;
		filter: drop-shadow(0 0 0 transparent);
		cursor: pointer;

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

table {
	margin-top: 0.5rem;
}
</style>
