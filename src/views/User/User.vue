<template>
  <div class="row">
    <div class="col">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <div class="row">
          <div class="col">
            <b-form-group id="input-group-email" label="Email address:" label-for="input-email">
              <b-form-input
                id="input-email"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-password"
              label="Your Password:"
              label-for="input-password"
            >
              <b-form-input
                id="input-password"
                v-model="form.password"
                required
                placeholder="Enter password"
                type="password"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-repeat-password"
              label="Repeat Your Password:"
              label-for="input-repeat-password"
            >
              <b-form-input
                id="input-repeat-password"
                v-model="form.repeatPassword"
                required
                placeholder="Enter your password"
                type="password"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col">
            <b-form-group id="input-group-name" label="Enter your name:" label-for="input-name">
              <b-form-input
                id="input-name"
                v-model="form.name"
                type="text"
                required
                placeholder="Enter name"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-surname" label="Your Surname:" label-for="input-surname">
              <b-form-input
                id="input-surname"
                v-model="form.surname"
                required
                placeholder="Enter surname"
                type="text"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-role"
              label="Repeat Your Password:"
              label-for="input-role"
            >
              <b-form-select v-model="form.role" :options="options"></b-form-select>
            </b-form-group>
          </div>
        </div>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: "editor", text: "Editor of the site" }
      ],
      form: {
        email: "",
        password: "",
        repeatPassword: "",
        name: "",
        surname: "",
        role: null
      },
      show: true
    };
  },
  mounted() {
    console.log("USERS");
  },
  methods: {
    ...mapGetters({ getToken: "getToken" }),
    makeSubmit(token) {
      const options = {
        headers: {
          Authorization: "Basic " + token,
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*"
        },
        withCredentials: true
      };
      this.axios
        .post(
          process.env.VUE_APP_API_URL + "addUser",
          {
            users_email: this.form.email,
            users_password: this.form.password,
            users_name: this.form.name,
            users_surname: this.form.surname,
            users_role: this.form.role
          },
          options
        )
        .then(response => {
          // eslint-disable-next-line
          console.log(response);

          //this.$router.push("users");
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      // eslint-disable-next-line
      console.log(this.$store);
      const token = this.getToken();
      console.log(token);
      if (token === "") {
        axios
          .get(process.env.VUE_APP_API_URL + "getToken", {
            headers: {
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
          })
          .then(response => {
            const token = response.data.token;
            if (token !== '') {
              this.makeSubmit(token);
            } else {
              this.$router.push({ name: '/' })
            }
          });
      } else {
        this.makeSubmit(token);
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>