/**
 * This interface is for the initial state of the feature slice
 */
export interface Branches {
  data: BranchRecord[];
  initialValues: any;
  pending: boolean;
  isModalVisible: boolean;
}

export interface BranchRecord {
  _id: string;
  name: string;
  country: string;
  city: string;
}
