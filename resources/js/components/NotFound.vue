<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-10">
				<div class="error-content mt-3">
					<h3><i class="fas fa-exclamation-triangle text-yellow"></i> Oops! Page not found.</h3>

					<p>We could not find the page you were looking for. Meanwhile, you may <router-link to="/home">return to homepage.</router-link></p>
				</div>
				<img src="img/not_found.svg" class="img-fluid w-75 center" alt="Page Not Found" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		mounted() {},
	};
</script>
