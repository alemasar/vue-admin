<template>
  <div class="row">
    <div class="col">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-login"
          label="Email address:"
          label-for="input-email"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-email"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Password:" label-for="input-password">
          <b-form-input
            id="input-password"
            v-model="form.password"
            required
            placeholder="Enter password"
            type="password"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>
  </div>
</template>

<script>
import Base64 from "@/helpers/encoding";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      show: true
    };
  },
  mounted() {
    console.log("LOGIN");
  },
  methods: {
    ...mapGetters({getToken: "getToken"}),
    onSubmit(evt) {
      evt.preventDefault();
      // eslint-disable-next-line
      const token = Base64.encode(this.form.email + ":" + this.form.password);
      this.$store.commit("setToken", token);
      console.log(this.getToken());
      const options = {
        headers: {
          Authorization: "Basic " + token,
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*"
        },
        withCredentials: true
      };
      this.axios
        .post(process.env.VUE_APP_API_URL + "login", {}, options)
        .then(response => {
          // eslint-disable-next-line
          console.log(this.$router);

          this.$router.push("users");
        });
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