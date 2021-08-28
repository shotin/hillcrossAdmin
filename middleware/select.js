export default async ({ store }) => {
  const select = store.getters["select/select"];

  if (!select) {
    return await store.dispatch("select/fetchSelect");
  }
};
