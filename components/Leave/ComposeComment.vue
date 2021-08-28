<template>
  <div class="card-body chat_windows">
    <ul class="mb-0" v-if="type === 'leave_messaging'">
      <span v-for="(message, index) in trackers" :key="index">
        <li
          :class="[
            message.sender.id === user.id ? 'my-message' : 'other-message',
          ]"
        >
          <img
            v-if="message.sender.id !== user.id"
            class="avatar mr-3"
            :src="message.sender.avatar"
            alt="avatar"
          />
          <div class="message">
            <p
              :class="[
                message.sender.id === user.id
                  ? 'bg-light-gray'
                  : 'bg-light-cyan',
              ]"
            >
              {{ message.comment }}
            </p>
            <span class="time">{{ message.date_created }}</span>
          </div>
        </li>
      </span>
    </ul>
    <div class="chat-message clearfix" v-if="leave.status !== 'Approved'">
      <div class="input-group mb-0">
        <form
          @submit.prevent="processComment()"
          style="width: 100% !important;"
        >
          <!-- <a href="javascript:void(0);"><i class="fas fa-camera"></i></a> -->
          <textarea
            class="form-control"
            placeholder="Enter text here..."
            v-model="form.comment"
          ></textarea>
          <Button
            :button_class="'btn btn-primary'"
            :disabled="disabled"
            :button_type="'submit'"
            :loading="loading"
            :value="'Send'"
          />
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  props: {
    leave: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.getTrackers();
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      trackers: "messaging/messages",
      type: "messaging/type",
    }),
  },
  data() {
    return {
      loading: false,
      disabled: false,
      form: {
        comment: "",
      },
    };
  },
  methods: {
    async getTrackers() {
      await this.$axios
        .get(`/leaves/${this.leave.id}/leave-trackers`)
        .then((res) => {
          this.$store.commit("messaging/SET_DATA", res.data.data);
          this.$store.commit("messaging/SET_TYPE", "leave_messaging");
        })
        .catch((err) => {});
    },
    async processComment() {
      this.loading = true;
      this.disabled = true;
      await this.$axios
        .post(`/leaves/${this.leave.id}/leave-trackers`, this.form)
        .then((res) => {
          this.$store.commit("messaging/ADD_DATA", res.data.data);
          this.stopLoader();
          this.form.comment = ''
        })
        .catch((err) => {
          this.stopLoader();
        });
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
  },
};
</script>
