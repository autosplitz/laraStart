<template>
	<div class="container">
		<div class="row">
			<div class="col-md-12 mt-3">
				<!-- Widget: user widget style 1 -->
				<div class="card card-widget widget-user">
					<!-- Add the bg color to the header using any of the bg-* classes -->
					<div class="widget-user-header text-white">
						<h3 class="widget-user-username text-right">Khalid Adegoke</h3>
						<h5 class="widget-user-desc text-right">Web Designer</h5>
					</div>
					<div class="widget-user-image">
						<img class="img-circle" src="/img/profile.png" alt="User Avatar" />
					</div>
					<div class="card-footer">
						<div class="row">
							<div class="col-sm-4 border-right">
								<div class="description-block">
									<h5 class="description-header">3,200</h5>
									<span class="description-text">SALES</span>
								</div>
								<!-- /.description-block -->
							</div>
							<!-- /.col -->
							<div class="col-sm-4 border-right">
								<div class="description-block">
									<h5 class="description-header">13,000</h5>
									<span class="description-text">FOLLOWERS</span>
								</div>
								<!-- /.description-block -->
							</div>
							<!-- /.col -->
							<div class="col-sm-4">
								<div class="description-block">
									<h5 class="description-header">35</h5>
									<span class="description-text">PRODUCTS</span>
								</div>
								<!-- /.description-block -->
							</div>
							<!-- /.col -->
						</div>
						<!-- /.row -->
					</div>
				</div>
				<!-- /.widget-user -->
			</div>

			<div class="col-md-12">
				<div class="card">
					<div class="card-header p-2">
						<ul class="nav nav-pills">
							<li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">Activity</a></li>
							<li class="nav-item"><a class="nav-link" href="#settings" data-toggle="tab">Settings</a></li>
						</ul>
					</div>
					<!-- /.card-header -->
					<div class="card-body">
						<div class="tab-content">
							<div class="tab-pane active" id="activity">
								<!-- Post -->
								<div class="post">
									<h1 class="text-center">Display User Activities</h1>
								</div>
								<!-- /.post -->
							</div>

							<div class="tab-pane" id="settings">
								<form class="form-horizontal">
									<div class="form-group row">
										<label for="inputName" class="col-sm-2 col-form-label">Name</label>
										<div class="col-sm-10">
											<input v-model="form.name" type="text" class="form-control" id="inputName" placeholder="Name" />
										</div>
									</div>
									<div class="form-group row">
										<label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
										<div class="col-sm-10">
											<input v-model="form.email" type="email" class="form-control" id="inputEmail" placeholder="Email" />
										</div>
									</div>
									<div class="form-group row">
										<label for="inputExperience" class="col-sm-2 col-form-label">Biography</label>
										<div class="col-sm-10">
											<textarea v-model="form.bio" class="form-control" id="inputExperience" placeholder="Biography"></textarea>
										</div>
									</div>
									<div class="form-group row">
										<label for="inputExperience" class="col-sm-2 col-form-label">Experience</label>
										<div class="col-sm-10">
											<textarea class="form-control" id="inputExperience" placeholder="Experience"></textarea>
										</div>
									</div>
									<div class="form-group row">
										<label for="inputPhoto" class="col-sm-2 col-form-label">Profile Photo</label>
										<div class="col-sm-10">
											<input type="file" class="form-control" id="inputPhoto" />
										</div>
									</div>
									<div class="form-group row">
										<label for="inputPassport" class="col-sm-2 col-form-label"
											>Passport <small class="text-muted">(leave empty of not changing)</small></label
										>
										<div class="col-sm-10">
											<input type="text" class="form-control" id="inputPassport" placeholder="Passport" />
										</div>
									</div>
									<div class="form-group row">
										<div class="offset-sm-2 col-sm-10">
											<div class="checkbox">
												<label> <input type="checkbox" /> I agree to the <a href="#">terms and conditions</a> </label>
											</div>
										</div>
									</div>
									<div class="form-group row">
										<div class="offset-sm-2 col-sm-10">
											<button type="submit" class="btn btn-success">Update</button>
										</div>
									</div>
								</form>
							</div>
							<!-- /.tab-pane -->
						</div>
						<!-- /.tab-content -->
					</div>
					<!-- /.card-body -->
				</div>
				<!-- /.nav-tabs-custom -->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: new Form({
					id: "",
					name: "",
					email: "",
					password: "",
					type: "",
					bio: "",
					photo: "",
				}),
			};
		},
		mounted() {
			console.log("Component mounted.");
		},
		created() {
			axios
				.get("api/profile")
				.then(({ data }) => {
					// Success
					this.form.fill(data);
				})
				.catch(() => {
					this.$Progress.fail();
				});
		},
	};
</script>

<style>
	.widget-user-header {
		background-image: linear-gradient(to top, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url("/img/timeline.jpg");
		background-position: center center;
		background-size: cover;
		height: 230px !important;
	}
	.widget-user-image {
		top: 180px !important;
	}
	.widget-user .card-footer {
		padding-top: 40px;
	}
</style>
