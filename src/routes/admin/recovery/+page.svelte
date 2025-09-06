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
		<div>
			<button
				class="w-full cursor-pointer rounded-sm bg-blue-500 py-2 font-semibold text-white transition-colors hover:bg-blue-600"
				type="submit">Submit</button
			>
			<span class="mt-2.5 block">
				Know the password?
				<a class="text-blue-500 hover:underline" href="/admin/login">Login</a>
			</span>
		</div>
	</form>
</main>
