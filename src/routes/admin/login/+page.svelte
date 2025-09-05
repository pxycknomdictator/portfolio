<script lang="ts">
	import { superForm } from "sveltekit-superforms";
	import OpenEye from "$components/OpenEye.svelte";
	import CloseEye from "$components/CloseEye.svelte";

	let { data } = $props();
	const { form, errors, enhance } = superForm(data.form);

	let showPassword = $state<boolean>(false);

	function togglePasswordEye() {
		showPassword = !showPassword;
	}
</script>

<main class="grid h-screen w-screen place-items-center">
	<form class="w-full max-w-2xl space-y-4 p-7" method="POST" action="?/login" use:enhance>
		<h1 class="mb-8 text-center text-xl sm:text-3xl">Sign in to continue</h1>
		<section class="space-y-1">
			<div>
				<label class="mb-1 block" for="email">Email:</label>
				<input
					required
					id="email"
					type="email"
					name="email"
					autocomplete="off"
					placeholder="Enter your email address"
					class="w-full rounded-sm"
					bind:value={$form.email}
				/>
			</div>
			{#if $errors.email}
				<small class="font-semibold text-red-500">{$errors.email}</small>
			{/if}
		</section>
		<section class="space-y-1">
			<div>
				<label class="mb-1 block" for="password">Password:</label>
				<div class="relative">
					<input
						required
						id="password"
						type={!showPassword ? "password" : "text"}
						name="password"
						autocomplete="off"
						placeholder="Enter your password"
						class="w-full rounded-sm pr-10"
						bind:value={$form.password}
					/>
					<button
						onclick={togglePasswordEye}
						type="button"
						class="absolute inset-y-0 right-2 flex cursor-pointer items-center"
					>
						{#if !showPassword}
							<OpenEye />
						{:else}
							<CloseEye />
						{/if}
					</button>
				</div>
			</div>
			{#if $errors.password}
				<small class="font-semibold text-red-500">{$errors.password}</small>
			{/if}
		</section>
		<div>
			<button
				class="w-full cursor-pointer rounded-sm bg-blue-500 py-2 font-semibold text-white transition-colors hover:bg-blue-600"
				type="submit">Submit</button
			>
		</div>
	</form>
</main>
