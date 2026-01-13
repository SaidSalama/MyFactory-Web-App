import React from "react";
import DirectorSpace from "./DirectorSpace";
import EngineerSpace from "./EngineerSpace";
import TechnicianSpace from "./TechnicianSpace";

const UserSpace = ({ user, filterData }) => {
	const components = {
		Engineer: EngineerSpace,
		Director: DirectorSpace,
		Technician: TechnicianSpace,
	};

	const Component = components[user.type];
	return Component ? <Component filterData={filterData} /> : null;
};

export default UserSpace;
