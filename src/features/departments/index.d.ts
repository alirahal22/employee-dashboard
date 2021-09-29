/**
 * This interface is for the initial state of the feature slice
 */
export interface Departments {
  data: DepartmentRecord[];
  initialValues: any;
  pending: boolean;
  isModalVisible: boolean;
}

export interface DepartmentRecord {
  _id: string;
  name: string;
  description: string;
}
