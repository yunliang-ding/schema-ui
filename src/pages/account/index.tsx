import { SimplePage } from "@/components";
import FormPage from './form'
import ListPage from './list'
export default SimplePage({
  schemas: {
    search: "schema/account/search.ts",
    table: "schema/account/table.tsx",
    form: "schema/account/form.ts",
  },
})(ListPage, {
  form: FormPage,
});
