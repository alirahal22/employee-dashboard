import { BranchRecord } from "&features/branches";
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

export const filterBranchesOnChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  storeList: BranchRecord[]
) => {
  const query = e?.target?.value?.trim()?.toLowerCase();
  return storeList.filter(
    (store) =>
      store?.name?.toLowerCase().includes(query) ||
      store?.country?.toLowerCase().includes(query) ||
      store?.city?.toLowerCase().includes(query) ||
      store?._id?.toLowerCase().includes(query) ||
      store?._id?.toLowerCase().includes(query) ||
      query === ""
  );
};
