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
$border-radius: 0.4em;

.ui-panel {
	width: 100%;
	background-color: $black-light;

	&.is-color-primary {
		.ui-panel-header {
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
