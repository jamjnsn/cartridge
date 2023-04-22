<script setup lang="ts">
defineEmits(['dismiss'])

withDefaults(
	defineProps<{
		color?: UiColor
		dismissable?: boolean
	}>(),
	{
		color: 'default',
		dismissable: true
	}
)
</script>

<template>
	<div
		class="alert"
		:class="[`-color-${color}`]"
	>
		<div class="alert__body"><slot /></div>

		<a
			class="alert__close"
			@click="$emit('dismiss')"
		>
			<UiIcon type="x" />
		</a>
	</div>
</template>

<style lang="scss">
.alert {
	padding: 1em;
	background-color: $grey-darker;
	border-radius: 0.3em;

	&:not(:last-child) {
		margin-bottom: 1rem;
	}

	&__close {
		display: block;
		position: absolute;
		font-size: 0.9rem;
		top: 0;
		right: 0.5em;
		background-color: rgba(0, 0, 0, 0.2);
		padding: 0.25em 0.3em;
		border-radius: 0 0 0.2em 0.2em;
		transition: all 0.1s ease;

		&:hover {
			background-color: rgba(0, 0, 0, 0.3);
		}
	}

	&.-color-default {
		background-color: $grey-dark;
	}

	&.-color-primary {
		background-color: $primary;
	}

	&.-color-ghost {
		background-color: transparent;
	}

	&.-color-danger {
		background-color: $danger;
	}

	&.-color-success {
		background-color: $success;
	}
}
</style>
