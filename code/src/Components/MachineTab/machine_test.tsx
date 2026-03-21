import { useEffect, useState } from "react";
import type { Machine } from "../../../models/machine";
import type { ApiResponse } from "../../models/api_response";
import MachineAPI_Service from "../../Services/machine_api_service";

const MachinesComponent = () => {
	const [machines, setMachines] = useState<ApiResponse<Machine[]> | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		const fetchMachines = async () => {
			try {
				const response = await new MachineAPI_Service().selectAll();
				console.log(`response is ${response}`);
				setMachines(response);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchMachines();
	}, []);

	console.log(machines);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading machines</p>;

	return (
		<div>
			{machines?.data?.map((machine) => (
				<div key={machine.id}>{machine.name}</div>
			))}
		</div>
	);
};

export default MachinesComponent;
