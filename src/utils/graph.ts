import moment from "moment";

export const groupByDate = (dataArr: Array<Object>) => {
  const data: any[] = [];

  let dt = "";
  let total = 0;

  dataArr.forEach((el: any) => {
    const obj: any = {};
    obj.date = moment(el.TRANSACTION_DT).format("MMM-DD");

    if (el.TRANSACTION_DT !== dt) {
      obj.total = el.VOLUME_USD;
      data.push(obj);
    } else {
      obj.total = total + el.VOLUME_USD;
      data.splice(data?.length - 1, 1, obj);
    }

    dt = el.TRANSACTION_DT;
    total = obj.total;
  });

  return data;
};
