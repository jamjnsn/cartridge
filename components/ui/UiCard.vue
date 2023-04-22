<template>
	<div class="card">
		<div class="card__body">
			<slot />
		</div>

		<div class="card__footer">
			<slot name="footer" />
		</div>
	</div>
</template>

<style lang="scss">
.card {
	background-color: $black-lighter;
	border-radius: 0.4rem;
	overflow: hidden;

	&__body {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	&__footer {
		border-top: 1px solid lighten($black-lighter, 5%);
		display: flex;

		&-item {
			padding: 1rem;
			flex: 1 1 auto;
			display: flex;
			align-items: center;
			justify-content: center;

			&:not(:last-child) {
				border-right: 1px solid lighten($black-lighter, 5%);
			}

			.icon {
				margin-right: 0.25em;
			}
		}

		a {
			&.-color-danger {
				&:hover {
					background-color: $danger;
				}
			}

			&:hover {
				background-color: lighten($black-lighter, 2%);
			}
		}
	}
}
</style>
