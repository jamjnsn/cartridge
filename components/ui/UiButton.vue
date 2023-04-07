<script setup lang="ts">
withDefaults(
	defineProps<{
		size?: UiSize
		color?: UiColor | 'ghost'
		centered?: boolean
		fullwidth?: boolean
		icon?: UiIconName
		disabled?: boolean
		loading?: boolean
	}>(),
	{
		size: 'default',
		color: 'default',
		centered: false,
		fullwidth: false,
		icon: undefined,
		disabled: false,
		loading: false
	}
)
</script>

<template>
	<button
		class="ui-button"
		:class="[
			`is-size-${size}`,
			`is-color-${color}`,
			centered ? 'is-centered' : '',
			fullwidth ? 'is-full-width' : '',
			loading ? 'is-loading' : ''
		]"
		:disabled="disabled || loading"
	>
		<UiIcon
			v-if="icon !== undefined"
			:type="icon"
		/>

		<div class="ui-button-content"><slot /></div>

		<div class="ui-button-loading-container">
			<Transition>
				<UiSpinner
					v-if="loading"
					size="50%"
				/>
			</Transition>
		</div>
	</button>
</template>

<style lang="scss">
.ui-button-content {
	display: flex;
	align-items: center;
}

.ui-button {
	display: inline-flex;
	align-items: center;
	background-color: $grey-dark;
	border-radius: 0.3em;
	padding: calc(0.75em - 1px) calc(1em - 1px);
	box-shadow: none;
	transition: all 0.1s ease;
	color: inherit;
	cursor: pointer;
	outline: 0;
	border: 0;

	& > * {
		opacity: 1;
		transition: opacity 0.1s ease-in-out;
	}

	& > *:not(:last-child),
	& > .ui-icon {
		margin-right: 0.25rem;
	}

	&.is-loading {
		& > *:not(.ui-button-loading-container) {
			opacity: 0;
		}
	}

	&:hover {
		background-color: lighten($grey-dark, 4%);
		text-decoration: none;
	}

	&.is-size-small {
		font-size: 0.8em;
	}

	&.is-color-primary {
		background-color: $primary;

		&:hover {
			background-color: lighten($primary, 3%);
		}
	}

	&.is-color-ghost {
		background-color: transparent;

		&:hover {
			background-color: $black-lighter;
		}
	}

	&.is-color-danger {
		background-color: $danger;

		&:hover {
			background-color: lighten($danger, 3%);
		}
	}

	&.is-color-success {
		background-color: $success;

		&:hover {
			background-color: lighten($success, 3%);
		}
	}

	&:disabled {
		cursor: default;
		background-color: $grey-darker;

		&:hover {
			background-color: $grey-darker;
		}
	}

	&.is-full-width {
		display: flex;
		width: 100%;
	}

	&.is-centered {
		justify-content: center;
	}
}

.ui-button-loading-container {
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}
</style>
