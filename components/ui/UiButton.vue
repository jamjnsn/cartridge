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
		class="button"
		:class="[
			`-color-${color}`,
			`-size-${size}`,
			centered ? '-centered' : '',
			fullwidth ? '-full-width' : '',
			loading ? '-loading' : ''
		]"
		:disabled="disabled || loading"
	>
		<UiIcon
			v-if="icon !== undefined"
			:type="icon"
		/>

		<div class="button__content"><slot /></div>

		<div class="button__loading">
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
.button {
	display: inline-flex;
	align-items: center;
	border-radius: 0.3em;
	padding: calc(0.75em - 1px) calc(1em - 1px);
	box-shadow: none;
	transition: all 0.1s ease;
	cursor: pointer;
	outline: 0;
	border: 0;
	color: $white;

	& > * {
		opacity: 1;
		transition: opacity 0.1s ease-in-out;
	}

	& > *:not(:last-child),
	& > .icon {
		margin-right: 0.25rem;
	}

	&:disabled {
		cursor: default;
		background-color: $grey-darker;

		&:hover {
			background-color: $grey-darker;
		}
	}

	&.-loading {
		& > *:not(.button__loading) {
			opacity: 0;
		}
	}

	&.size-small {
		font-size: 0.8em;
	}

	&.-color-default {
		background-color: $grey-dark;

		&:hover {
			background-color: lighten($grey-dark, 4%);
			text-decoration: none;
		}
	}

	&.-color-primary {
		background-color: $primary;

		&:hover {
			background-color: lighten($primary, 3%);
		}
	}

	&.-color-ghost {
		background-color: transparent;

		&:hover {
			background-color: $black-lighter;
		}
	}

	&.-color-danger {
		background-color: $danger;

		&:hover {
			background-color: lighten($danger, 3%);
		}
	}

	&.-color-success {
		background-color: $success;

		&:hover {
			background-color: lighten($success, 3%);
		}
	}

	&.-full-width {
		display: flex;
		width: 100%;
	}

	&.-centered {
		justify-content: center;
	}
}

.button__content {
	display: flex;
	align-items: center;
}

.button__loading {
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
