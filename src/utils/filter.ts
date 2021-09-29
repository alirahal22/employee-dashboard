import { DepartmentRecord } from "&features/departments/index";

/** Filters list of stores based on input change event */
export const filterDepartmentsOnChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  storeList: DepartmentRecord[]
) => {
  const query = e?.target?.value?.trim()?.toLowerCase();
  return storeList.filter(
    (store) =>
      store?.name?.toLowerCase().includes(query) ||
      store?._id?.toLowerCase().includes(query) ||
      store?._id?.toLowerCase().includes(query) ||
      query === ""
  );
};
