<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { Toaster, toast } from "svelte-sonner";

	let { data } = $props();

	onMount(async () => {
		if (data.flashMessage) {
			toast.success("Admin Login Successfully", { duration: 2000 });
			await goto("/admin/dashboard", { replaceState: true });
		}
	});
</script>

<Toaster position="top-right" richColors />

<h1 class="text-2xl">Admin Dashboard</h1>
