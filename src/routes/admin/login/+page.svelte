<script lang="ts">
	import { superForm } from "sveltekit-superforms";

	let { data } = $props();
	const { form, errors, enhance } = superForm(data.form);
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
					placeholder="Enter you email address"
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
				<input
					required
					id="password"
					type="password"
					name="password"
					autocomplete="off"
					placeholder="Enter you password"
					class="w-full rounded-sm"
					bind:value={$form.password}
				/>
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
