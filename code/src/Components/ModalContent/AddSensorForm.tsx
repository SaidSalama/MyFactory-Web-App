import React, { useContext } from "react";
import type { Machine } from "../../../models/machine";
import { MachinesContext } from "../../DataProvider";
import SelectItem from "../Select/Select";
import Select from "../Select/Select";

const AddSensorForm = ({ newSensor, setNewSensor }) => {
	const Machines = useContext(MachinesContext); //get the Machines from the context;
	return (
		<>
			<div className="form-group">
				<label className="form-label">Sensor Name</label>
				<input
					className="form-input"
					value={newSensor.name}
					onChange={(e) => setNewSensor({ ...newSensor, name: e.target.value })}
					placeholder="Temperature sensor"
				/>
			</div>
			<div className="form-group">
				<label className="form-label">Value</label>
				<input
					className="form-input"
					value={newSensor.value}
					onChange={(e) =>
						setNewSensor({ ...newSensor, value: e.target.value })
					}
					placeholder="0"
				/>
			</div>
			<div className="form-group">
				<label className="form-label">Machine</label>
				<Select
					value={newSensor.machine_id}
					onValueChange={(v) => setNewSensor({ ...newSensor, machine_id: v })}
				>
					{Machines?.data?.map((machine: Machine) => (
						<SelectItem key={machine.machine_id} value={machine.machine_id}>
							{machine.name}
						</SelectItem>
					))}
					{/* <SelectItem value={1}>St-Line</SelectItem>
                    <SelectItem value={2}>Mid-Line</SelectItem>
                    <SelectItem value={3}>End-Line</SelectItem> */}
				</Select>
			</div>
			<div className="form-group">
				<label className="form-label">Type</label>
				<Select
					value={newSensor.sensortype_id}
					onValueChange={(v) =>
						setNewSensor({ ...newSensor, sensortype_id: v })
					}
				>
					<SelectItem value={1}>DIGITAL</SelectItem>
					<SelectItem value={2}>ANALOG</SelectItem>
				</Select>
			</div>
		</>
	);
};

export default AddSensorForm;
