<template>
	<div class="container">
		<div class="row mt-5">
			<div class="col-12">
				<div class="card">
					<div class="card-header">
						<h3 class="card-title">Users Table</h3>

						<div class="card-tools">
							<button class="btn btn-sm btn-success" @click="newModal"><i class="fas fa-user-plus fa-fw"></i> Add New</button>
						</div>
					</div>
					<!-- /.card-header -->
					<div class="card-body table-responsive p-0">
						<table class="table table-hover">
							<thead>
								<tr>
									<th>Id</th>
									<th>Name</th>
									<th>Email</th>
									<th>Type</th>
									<th>Registered at</th>
									<th>Modify</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="user in users" :key="user.id">
									<td>{{ user.id }}</td>
									<td>{{ user.name }}</td>
									<td>{{ user.email }}</td>
									<td>{{ user.type | upText }}</td>
									<td>{{ user.created_at | formatDate }}</td>
									<td>
										<span class="btn-group">
											<button class="btn btn-sm bg-blue" @click="editModal(user)"><i class="fa fa-edit"></i></button>
											<button @click="deleteUser(user.id)" class="btn btn-sm bg-red"><i class="fa fa-trash-alt"></i></button>
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<!-- /.card-body -->
				</div>
				<!-- /.card -->
			</div>
		</div>

		<!-- Modal -->
		<div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 v-show="!editmode" class="modal-title" id="addNewLabel"><i class="fas fa-user-plus green fa-fw"></i> Add New User</h5>
						<h5 v-show="editmode" class="modal-title" id="addNewLabel"><i class="fas fa-edit orange fa-fw"></i> Modify User's Info.</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<form @submit.prevent="editmode ? updateUser() : createUser()">
						<div class="modal-body">
							<div class="form-group">
								<input
									v-model="form.name"
									type="text"
									name="name"
									class="form-control"
									:class="{ 'is-invalid': form.errors.has('name') }"
									placeholder="Name"
								/>
								<has-error :form="form" field="name"></has-error>
							</div>

							<div class="form-group">
								<input
									v-model="form.email"
									type="email"
									name="email"
									class="form-control"
									:class="{ 'is-invalid': form.errors.has('email') }"
									placeholder="Email Address"
								/>
								<has-error :form="form" field="email"></has-error>
							</div>

							<div class="form-group">
								<textarea
									v-model="form.bio"
									type="text"
									name="bio"
									class="form-control"
									id="bio"
									:class="{ 'is-invalid': form.errors.has('bio') }"
									placeholder="Short bio for user (Optional)"
								></textarea>
								<has-error :form="form" field="bio"></has-error>
							</div>

							<div class="form-group">
								<select v-model="form.type" name="type" class="form-control" id="type" :class="{ 'is-invalid': form.errors.has('type') }">
									<option value="">Select User Role</option>
									<option value="admin">Admin</option>
									<option value="user">Standard User</option>
									<option value="author">Author</option>
								</select>
								<has-error :form="form" field="type"></has-error>
							</div>

							<div class="form-group">
								<input
									v-model="form.password"
									type="password"
									name="password"
									class="form-control"
									id="password"
									:class="{ 'is-invalid': form.errors.has('password') }"
									placeholder="Password"
								/>
								<has-error :form="form" field="password"></has-error>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">Close</button>
							<button v-show="!editmode" type="submit" class="btn btn-sm btn-primary">Create</button>
							<button v-show="editmode" type="submit" class="btn btn-sm btn-success">Update</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				editmode: false,
				users: {},
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
		methods: {
			newModal() {
				this.editmode = false;
				this.form.reset();
				$("#addNew").modal("show");
			},
			editModal(user) {
				this.editmode = true;
				this.form.reset();
				this.form.clear();
				$("#addNew").modal("show");
				this.form.fill(user);
			},
			updateUser(id) {
				this.$Progress.start();
				this.form
					.put("api/user/" + this.form.id)
					.then(() => {
						$("#addNew").modal("hide");
						Swal.fire("Updated!", "Information has been updated successfully.", "success");
						this.$Progress.finish();
						Fire.$emit("afterCreate");
					})
					.catch(() => {
						this.$Progress.fail();
					});
			},
			fetchUser() {
				axios
					.get("api/user")
					.then(({ data }) => {
						this.users = data.data;
					})
					.catch(() => {
						this.$Progress.fail();
					});
			},
			createUser() {
				this.$Progress.start();
				this.form
					.post("api/user")
					.then(() => {
						Fire.$emit("afterCreate");
						$("#addNew").modal("hide");
						Toast.fire({
							icon: "success",
							title: "User created successfully",
						});
						this.$Progress.finish();
					})
					.catch(() => {
						this.$Progress.fail();
					});
			},
			deleteUser(id) {
				Swal.fire({
					title: "Are you sure?",
					text: "You won't be able to revert this!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Yes, delete it!",
				}).then((result) => {
					if (result.value) {
						// * Send request to the server
						this.form
							.delete("api/user/" + id)
							.then(() => {
								Swal.fire("Deleted!", "Your file has been deleted.", "success");
								Fire.$emit("afterCreate");
							})
							.catch(() => {
								Swal.fire("Failed!", "There was something wrong!.", "warning");
								this.$Progress.fail();
							});
					}
				});
			},
		},
		created() {
			this.fetchUser();
			Fire.$on("afterCreate", () => {
				this.fetchUser();
			});
			// setInterval(() => this.fetchUser(), 3000);
		},
	};
</script>
