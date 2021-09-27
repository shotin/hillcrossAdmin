<template>
  <div class="card">
    <filter-quote
      :hasQualification="true"
      :hasSchool="true"
      :hasStatus="true"
      :hasCalender="true"
      :pageType="pageType"
      :defaultStatus="status"
      :hasStudyMode="true"
      class="mt-2 mb-2 ml-2 mr-2"
    />
    <div class="table-responsive" v-if="type === pageType">
      <table
        class="table table-hover table-vcenter text-nowrap table-striped mb-0"
      >
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student ID</th>
            <th>SAQA ID</th>
            <th>Study Mode</th>
            <th>Title</th>
            <th>School</th>
            <th>Qualification</th>
            <th>Academic Session</th>
            <th>Academic Semester</th>
            <th>Academic Calender</th>
            <th>Total Income</th>
            <th>Date Created</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="quote in quotes" :key="quote.id">
            <td>
              <div class="font-15">{{ quote.student_name }}</div>
            </td>
            <td>
              <div class="font-15">{{ quote.student_id }}</div>
            </td>
            <td>
              <div class="font-15">{{ quote.saqa_id }}</div>
            </td>
            <td>
              <div class="font-15">{{ quote.study_mode }}</div>
            </td>
            <td>
              <div class="font-15">{{ quote.title }}</div>
            </td>
            <td>
              {{ quote.school.name }}
            </td>
            <td>
              <strong>{{ quote.qualification.name }}</strong>
            </td>
            <td>
              <strong>{{ quote.calender.session.name }}</strong>
            </td>
            <td>
              <strong>{{ quote.calender.semester.name }}</strong>
            </td>
            <td>
              <strong>{{ quote.calender.name }}</strong>
            </td>
            <td>
              <strong>{{ quote.amount_word }}</strong>
            </td>
            <td>
              <strong>{{ quote.date }}</strong>
            </td>
            <td>
              <span class="tag tag-success" v-if="quote.status === 'Active'">{{
                quote.status
              }}</span>
              <span class="tag tag-danger" v-else>{{ quote.status }}</span>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-icon btn-sm"
                @click="openShow(quote)"
                title="View"
                v-if="show"
              >
                <i class="fa fa-eye"></i>
              </button>
              <button
                type="button"
                class="btn btn-icon btn-sm"
                @click="openEdit(quote)"
                title="Edit"
                v-if="edit"
              >
                <i class="fa fa-edit"></i>
              </button>
              <button
                type="button"
                class="btn btn-icon btn-sm"
                @click="openClone(quote)"
                title="Clone"
                v-if="edit"
              >
                <i class="fa fa-sync text-success"></i>
              </button>
              <delete-item
                :want_block="true"
                :data="quote"
                :url="`/quotes/${quote.id}`"
                :storeItem="`app/REMOVE_DATA`"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <paginate
        :pagination="records"
        @paginate="quotes"
        :offset="4"
        :emitTo="emitTo"
        class="mb-1 ml-2"
        v-if="quotes.length"
      />
    </div>
    <loader v-else />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
import DeleteItem from "@/components/Delete";
import FilterQuote from "@/components/Quote/FilterQuote";
import Paginate from "../Paginate.vue";
export default {
  props: {
    status: {
      type: String,
    },
    pageType: {
      type: String,
    },
    emitTo: {
      type: String,
    },
    show: {
      type: Boolean,
      required: true,
    },
    edit: {
      type: Boolean,
      required: true,
    },
    emitDetailsTo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      records: this.getRecords(),
    };
  },
  components: {
    Loader,
    DeleteItem,
    FilterQuote,
    Paginate,
  },
  computed: {
    ...mapGetters({
      quotes: "app/pageData",
      type: "app/pageType",
      quote_data: "app/pageViewData",
      quote_show_data: "app/pageShowData",
      clone_quote: "app/pageCloneData",
    }),
  },
  watch: {
    quote_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("edit-quote");
        }
      },
      immediate: true,
      deep: true,
    },
    clone_quote: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("clone-quote");
        }
      },
      immediate: true,
      deep: true,
    },
    quote_show_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit(`${this.emitDetailsTo}`);
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on(self.emitTo, function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getQuotes();
      }
    });
    this.$root.$on("update_pagination", function(filter) {
      self.records = filter;
    });
    this.getQuotes();
  },
  methods: {
    getQuotes() {
      this.$axios
        .get(`/quotes?page=${this.records.current_page}`, {
          params: { status: this.status },
        })
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", this.pageType);
          this.records = res.data.meta;
        })
        .catch((err) => {});
    },
    getRecords() {
      return {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
      };
    },
    openEdit(data) {
      const time = new Date();
      const update = { ...data, timestamp: time.getTime() };
      this.$store.commit("app/SET_VIEW_DATA", update);
    },
    openShow(data) {
      const time = new Date();
      const update = { ...data, timestamp: time.getTime() };
      this.$store.commit("app/SET_SHOW_DATA", update);
    },
    openClone(data) {
      const time = new Date();
      const update = { ...data, timestamp: time.getTime() };
      this.$store.commit("app/SET_CLONE_DATA", update);
    },
  },
};
</script>
