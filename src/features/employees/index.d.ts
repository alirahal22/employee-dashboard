/**
 * This interface is for the initial state of the feature slice
 */
export interface Employees {
  data: EmployeeRecord[];
  initialValues: any;
  pending: boolean;
  countries: string[];
  cities: string[];
  isModalVisible: boolean;
}

export interface EmployeeRecord {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  salary: number;
  annualLeaves: number;

  branchId: string;
  departmentId: string;
}
