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
		class="ui-panel"
		:class="`is-color-${color}`"
	>
		<header
			v-if="$slots.header"
			class="ui-panel-header"
		>
			<slot name="header" />
		</header>

		<div class="ui-panel-body">
			<slot />
		</div>

		<footer
			v-if="$slots.footer"
			class="ui-panel-footer"
		>
			<slot name="footer" />
		</footer>
	</div>
</template>

<style lang="scss">
.ui-panel {
	border-radius: 0.3rem;
	overflow: hidden;
	background-color: $black-light;

	&.is-color-primary {
		.ui-panel-header {
			background-color: $primary;
		}
	}
}

.ui-panel-header,
.ui-panel-footer,
.ui-panel-body {
	padding: 1rem;
}

.ui-panel-header {
	background-color: $grey-dark;

	h1 {
		font-weight: bold;
	}
}

.ui-panel-footer {
	background-color: $grey-darker;
}
</style>
