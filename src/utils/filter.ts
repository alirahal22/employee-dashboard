import { BranchRecord } from "&features/branches";
import { DepartmentRecord } from "&features/departments/index";
import { EmployeeRecord } from "&features/employees";

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
      query === ""
  );
};

export const filterEmployeesOnChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  storeList: EmployeeRecord[]
) => {
  const query = e?.target?.value?.trim()?.toLowerCase();
  return storeList.filter(
    (store) =>
      store?.firstName?.toLowerCase().includes(query) ||
      store?.lastName?.toLowerCase().includes(query) ||
      store?.email?.toLowerCase().includes(query) ||
      store?.phone?.toLowerCase().includes(query) ||
      store?._id?.toLowerCase().includes(query) ||
      query === ""
  );
};
