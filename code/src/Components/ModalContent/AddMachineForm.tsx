import React from "react";
import type { Machine } from "../../../models/machine";
import SelectItem from "../Select/Select";
import Select from "../Select/Select";

const AddMachineForm = ({ newMachine, setNewMachine }) => {
	return (
		<>
			<div className="form-group">
				<label className="form-label">Machine Name</label>
				<input
					className="form-input"
					value={newMachine.name}
					onChange={(e) =>
						setNewMachine({ ...newMachine, name: e.target.value })
					}
					placeholder="CNC Mill A-101"
				/>
			</div>
			<div className="form-group">
				<label className="form-label">Efficency</label>
				<input
					className="form-input"
					value={newMachine.efficency}
					onChange={(e) =>
						setNewMachine({ ...newMachine, efficency: e.target.value })
					}
					placeholder="CNC, Lathe, Press..."
				/>
			</div>
			<div className="form-group">
				<label className="form-label">Location</label>
				<Select
					value={newMachine.location_id}
					onValueChange={(v) =>
						setNewMachine({ ...newMachine, location_id: v })
					}
				>
					<SelectItem value={1}>St-Line</SelectItem>
					<SelectItem value={2}>Mid-Line</SelectItem>
					<SelectItem value={3}>End-Line</SelectItem>
				</Select>
			</div>
			<div className="form-group">
				<label className="form-label">Status</label>
				<Select
					value={newMachine.status_id}
					onValueChange={(v) => setNewMachine({ ...newMachine, status_id: v })}
				>
					<SelectItem value={4}>Running</SelectItem>
					<SelectItem value={5}>Stopped</SelectItem>
					<SelectItem value={6}>Blocked</SelectItem>
				</Select>
			</div>
		</>
	);
};

export default AddMachineForm;
