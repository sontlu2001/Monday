import { GetProp, TableProps } from "antd";

export type ITablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

export type IDataWithPagination<T> = {
    data: T[],
    totalDocument: number;
}