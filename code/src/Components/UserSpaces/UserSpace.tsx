import React, { useContext } from "react";
import { LoginUserContext } from "../../root";
import DirectorSpace from "./DirectorSpace";
import EngineerSpace from "./EngineerSpace";
import TechnicianSpace from "./TechnicianSpace";

const UserSpace = ({ filterData }) => {
	const LoggedInUser = localStorage.getItem("loggedInUser");
	const LoginUser = JSON.parse(LoggedInUser as string);
	const components = {
		Engineer: EngineerSpace,
		Director: DirectorSpace,
		Technician: TechnicianSpace,
	};

	const Component = components[LoginUser.role.name];
	return Component ? <Component filterData={filterData} /> : null;
};

export default UserSpace;
