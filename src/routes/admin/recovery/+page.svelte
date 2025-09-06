<script lang="ts">
	let disable = $state(false);

	function disableBtn() {
		disable = true;
	}
</script>

<main class="grid h-screen w-screen place-items-center">
	<form class="w-full max-w-2xl space-y-4 p-7">
		<h1 class="mb-8 text-center text-xl sm:text-3xl">Recover your Password</h1>
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
				/>
			</div>
		</section>
		<section class="space-y-1">
			<div>
				<label class="mb-1 block" for="code">Code:</label>
				<input
					required
					id="code"
					name="code"
					autocomplete="off"
					placeholder="Enter recovery code"
					class="w-full rounded-sm pr-10"
				/>
			</div>
		</section>
		<div class="grid grid-cols-2 gap-x-2">
			<button
				disabled={disable}
				type="button"
				onclick={disableBtn}
				class="w-full cursor-pointer rounded-sm border border-blue-500 py-2 font-semibold text-blue-500 transition-colors hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
			>
				Get Code
			</button>
			<button
				disabled={disable}
				class="w-full cursor-pointer rounded-sm bg-blue-500 py-2 font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
				type="submit"
			>
				Submit
			</button>

			<span class="mt-2.5 block">
				Know the password?
				<a class="text-blue-500 hover:underline" href="/admin/login">Login</a>
			</span>
		</div>
	</form>
</main>
