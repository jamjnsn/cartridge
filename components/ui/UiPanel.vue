<script setup lang="ts">
withDefaults(
	defineProps<{
		color?: 'default' | 'primary'
	}>(),
	{
		color: 'default'
	}
)
</script>

<template>
	<div
		class="panel"
		:class="`-color-${color}`"
	>
		<header
			v-if="$slots.header"
			class="panel__header"
		>
			<slot name="header" />
		</header>

		<div class="panel__body">
			<slot />
		</div>

		<footer
			v-if="$slots.footer"
			class="panel__footer"
		>
			<slot name="footer" />
		</footer>
	</div>
</template>

<style lang="scss">
$border-radius: 0.4em;

.panel {
	width: 100%;
	background-color: $black-light;

	&.-color-primary {
		.panel__header {
			background-color: $primary;
		}
	}

	&:first-child {
		border-top-left-radius: $border-radius;
		border-top-right-radius: $border-radius;
	}

	&:last-child {
		border-bottom-left-radius: $border-radius;
		border-bottom-right-radius: $border-radius;
	}
}

.panel__header,
.panel__footer,
.panel__body {
	padding: 1rem;
}

.panel__header {
	background-color: $grey-dark;

	h1 {
		font-weight: bold;
	}
}

.panel__footer {
	background-color: $grey-darker;
}
</style>
