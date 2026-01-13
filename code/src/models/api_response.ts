//the data type of the response of the http request as configured in the controllers
//<T> is a data type variable that we don't know it can have many values (general)
type ApiResponse<T> = {
	status: number;
	message: string;
	data?: T; //data is optional sometime there is no data so we used ? and its data type can change so we used <T>
};
export type { ApiResponse };
