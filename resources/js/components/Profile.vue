<template>
	<div class="container">
		<div class="row">
			<div class="col-md-12 mt-3">
				<!-- Widget: user widget style 1 -->
				<div class="card card-widget widget-user">
					<!-- Add the bg color to the header using any of the bg-* classes -->
					<div class="widget-user-header text-white">
						<h3 class="widget-user-username text-right">{{ this.form.name }}</h3>
						<h5 class="widget-user-desc text-right">{{ this.form.type }}</h5>
					</div>
					<div class="widget-user-image">
						<img class="img-circle" :src="getProfilePhoto()" alt="User Avatar" />
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
											<input
												v-model="form.name"
												type="text"
												class="form-control"
												:class="{ 'is-invalid': form.errors.has('name') }"
												id="inputName"
												placeholder="Name"
											/>
											<has-error :form="form" field="name"></has-error>
										</div>
									</div>
									<div class="form-group row">
										<label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
										<div class="col-sm-10">
											<input
												v-model="form.email"
												type="email"
												class="form-control"
												id="inputEmail"
												:class="{ 'is-invalid': form.errors.has('email') }"
												placeholder="Email"
											/>
											<has-error :form="form" field="email"></has-error>
										</div>
									</div>
									<div class="form-group row">
										<label for="inputBio" class="col-sm-2 col-form-label">Biography</label>
										<div class="col-sm-10">
											<textarea
												v-model="form.bio"
												class="form-control"
												:class="{ 'is-invalid': form.errors.has('bio') }"
												id="inputBio"
												placeholder="Biography"
											></textarea>
											<has-error :form="form" field="bio"></has-error>
										</div>
									</div>
									<div class="form-group row">
										<label for="inputPhoto" class="col-sm-2 col-form-label">Profile Photo</label>
										<div class="col-sm-10">
											<input @change="uploadProfile" type="file" class="form-control" id="inputPhoto" />
										</div>
									</div>
									<div class="form-group row">
										<label for="inputPassword" class="col-sm-2 col-form-label"
											>Password <small class="text-muted">(leave empty if not changing)</small></label
										>
										<div class="col-sm-10">
											<input
												v-model="form.password"
												type="password"
												class="form-control"
												:class="{ 'is-invalid': form.errors.has('password') }"
												id="inputPassword"
												placeholder="Password"
											/>
											<has-error :form="form" field="password"></has-error>
										</div>
									</div>
									<div class="form-group row">
										<div class="offset-sm-2 col-sm-10">
											<button @click.prevent="updateInfo" type="submit" class="btn btn-sm btn-success">Update</button>
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
		methods: {
			getProfilePhoto() {
				let photo = this.form.photo.length > 200 ? this.form.photo : "img/profile/" + this.form.photo;
				return photo;
			},
			uploadProfile(e) {
				let file = e.target.files[0];
				let reader = new FileReader();
				console.log(file);
				if (file["size"] < 2111775) {
					reader.onloadend = () => {
						this.form.photo = reader.result;
					};
					reader.readAsDataURL(file);
				} else {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "Image upload may not be more than 2MB!",
					});
				}
			},
			updateInfo() {
				this.$Progress.start();
				if (this.form.password == "") {
					this.form.password = undefined;
				}
				this.form
					.put("api/profile")
					.then(() => {
						Fire.$emit("AfterCreate");
						this.$Progress.finish();
					})
					.catch(() => {
						this.$Progress.fail();
					});
			},
		},
		created() {
			axios
				.get("api/profile")
				.then(({ data }) => {
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
