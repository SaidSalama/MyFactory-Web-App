import {
	Activity,
	Factory,
	PlusCircle,
	Trash2,
	UserPlus,
	Users,
	Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import ConfirmDeletionButton from "../Buttons/ConfirmDeletionButton";
import DeleteButton from "../Buttons/DeleteButton";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../Card/Card";
import Modal from "../Modal/Modal";
import Select from "../Select/Select";
import SelectItem from "../Select/Select";
import "./AdminTab.css";
import { useContext } from "react";
import type { Machine } from "../../../models/machine";
import type { Sensor } from "../../../models/sensor";
import type { Users as Usertype } from "../../../models/users"; //as usertype to avoid confilct with state users
import {
	MachinesContext,
	SensorsContext,
	UsersContext,
} from "../../DataProvider";
import type { ApiResponse } from "../../models/api_response";
import MachineAPI_Service from "../../Services/machine_api_service";
import SensorAPI_Service from "../../Services/sensor_api_service";
import UsersAPI_Service from "../../Services/users_api_service";
import AddMachineForm from "../ModalContent/AddMachineForm";
import AddSensorForm from "../ModalContent/AddSensorForm";
import AddUserForm from "../ModalContent/AddUserForm";

const AdminTab = () => {
	const Machines = useContext(MachinesContext); //get the Machines from the context;
	const FactoryUsers = useContext(UsersContext);
	const Sensors = useContext(SensorsContext);
	//flag to avoid double useEffect
	//let flagRead: boolean = false;
	// Modal states
	const [modalType, setModalType] = useState(""); // 'user', 'machine', 'sensor', or nothing for each modal type the modal is different
	const [isOpen, setIsOpen] = useState(false); //state to be true when a modal is opened
	const [add, setAdd] = useState(false); //state to be true when a modal is opened for adding a new element
	const [list, setList] = useState(false); //state to be true when a modal is opened for listing elements
	const [deletee, setDeletee] = useState(false); //state to be true when a modal is opened for  confirming deleteing element

	const [formError, setFormError] = useState<string | null>(null); //state storing errors of the forms

	//Fetching states
	// const [users, setUsers] = useState<ApiResponse<Usertype[]> | null>(null);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState<unknown>(null);

	//States of new elements
	// The state of the new user added by he client then sent to database
	const [newUser, setNewUser] = useState<Omit<Usertype, "user_id" | "role">>({
		username: "",
		password: "",
		email: "",
		role_id: 1, //1 is a default value
	});
	// The state of the new machine added by the client then sent to database
	//using omit instead of partial to be sure the user will give all required parameters
	const [newMachine, setNewMachine] = useState<
		Omit<Machine, "machine_id" | "last_maintenance" | "status" | "location">
	>({
		name: "",
		location_id: 1, //default value
		status_id: 5, //default value
		efficency: 100, //default value
	});
	// The state of the new sensor added by he client then sent to database
	const [newSensor, setNewSensor] = useState<
		Omit<Sensor, "sensor_id" | "type" | "machine">
	>({
		//just  default values
		sensortype_id: 1,
		value: 0,
		machine_id: 1,
		name: "",
	});

	//states of the selected items to be deleted or modified
	//state of the selected user
	const [selectedUser, setSelectedUser] = useState<Partial<Usertype>>({});
	//state of the selected machine
	const [selectedMachine, setSelectedMachine] = useState<Partial<Machine>>({});
	//state of the selected machine
	const [selectedSensor, setSelectedSensor] = useState<Partial<Sensor>>({});

	//creating users function using API service
	const createUsers = async () => {
		try {
			const response = await new UsersAPI_Service().create(newUser);
			console.log(`response is ${response.data}`);
		} catch (err) {
			console.log(`error of creation of user  is ${err}`);
		}
	};

	//validate the user data entered in the form (client validation)
	const validateUser = () => {
		const username = newUser.username;
		if (username.length < 3) {
			setFormError("Username must be at least  3 characters");
			return false;
		}
		if (username.length > 20) {
			setFormError("Username must be less than 20 characters");
			return false;
		}
		// password must be at least 5 characters
		if (newUser.password.length < 5) {
			setFormError("Password must be at least 5 characters long");
			return false;
		}
		// email must end with @factory.com
		if (!newUser.email.endsWith("@factory.com")) {
			setFormError("Email must end with @factory.com");
			return false;
		}

		setFormError(null); //there is  no error
		return true;
	};

	// deleting a user
	const deleteUsers = async () => {
		try {
			const response = await new UsersAPI_Service().delete(selectedUser);
			console.log(`deleted user is ${response.data}`);
		} catch (err) {
			console.log(`error of delete is ${err}`);
		}
	};

	//creating a machine
	const createMachines = async () => {
		try {
			const response = await new MachineAPI_Service().create(newMachine);
			console.log(`response is ${response.data}`);
		} catch (err) {
			console.log(`error of creating machine is ${err}`);
		}
	};

	//validate the new machine
	const validateMachine = () => {
		const username = newMachine.name;
		if (username.length < 3) {
			setFormError("Machine name must be at least  3 characters");
			return false;
		}
		if (username.length > 20) {
			setFormError("Username must be less than 20 characters");
			return false;
		}
		if (isNaN(newMachine.efficency)) {
			setFormError("Efficency must be a number");
			return false;
		}
		if (newMachine.efficency > 100 || newMachine.efficency < 0) {
			setFormError("Efficency must be between 0 and 100");
			return false;
		}

		setFormError(null); //there is  no error
		return true;
	};

	//delete a machine
	const deleteMachine = async () => {
		try {
			const response = await new MachineAPI_Service().delete(selectedMachine);
			console.log(`deleted machine is ${response.data}`);
		} catch (err) {
			console.log(`error of delete is ${err}`);
		}
	};

	//delete a sensor
	const deleteSensor = async () => {
		try {
			const response = await new SensorAPI_Service().delete(selectedSensor);
			console.log(`deleted sensor is ${response.data}`);
		} catch (err) {
			console.log(`error of delete is ${err}`);
		}
	};
	// create or add sensor
	const createSensor = async () => {
		try {
			const response = await new SensorAPI_Service().create(newSensor);
			console.log(`created sensor is ${response.data}`);
		} catch (err) {
			console.log(`error of delete is ${err}`);
		}
	};

	//validate a new sensor
	const validateSensor = () => {
		const name = newSensor.name;
		if (name.length < 2) {
			setFormError("name of sensor  must be at least  2 characters");
			return false;
		}
		if (name.length > 20) {
			setFormError("name of the sensor must be less than 20 characters");
			return false;
		}
		// for digital sensors value must be 0 or 1
		if (newSensor.sensortype_id === 1) {
			if (newSensor.value > 1 || newSensor.value < 0) {
				setFormError("Digital sensors value can only be 1 or 0");
				return false;
			}
		}
		setFormError(null); //there is  no error
		return true;
	};
	const openModal = (type: string) => {
		setModalType(type);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		setModalType("");
		setList(false);
		setAdd(false);
		setDeletee(false);
		//reset form error
		setFormError(null);
		// Reset forms
		setNewUser({ username: "", password: "", email: "", role_id: 1 });
		setNewMachine({
			name: "",
			location_id: 1, //default value
			status_id: 5, //default value
			efficency: 100, //default value
		});

		setNewSensor({ sensortype_id: 1, value: 0, machine_id: 1, name: "" });
	};

	const handleSubmit = () => {
		if (modalType === "user") {
			if (!validateUser()) return; //if there is an error don't send to backend
			console.log("Submitting:", { modalType, newUser });
			createUsers(); //send to the backend
			closeModal();
		} else if (modalType === "machine") {
			if (!validateMachine()) return;
			console.log(`the new machine name is ${newMachine.name}`);
			createMachines();
			closeModal();
		} else if (modalType === "sensor") {
			if (!validateSensor()) return;
			console.log(`the new sensor is ${newSensor.name}`);
			createSensor();
			closeModal();
		}
	};

	if (!FactoryUsers) return <p>Loading....</p>;

	return (
		<div className="admin-container">
			<Card className="admin-main-card">
				<CardHeader>
					<CardTitle className="admin-title">Administration Panel</CardTitle>
					<CardDescription className="admin-desc">
						Manage users, machines, and sensors
					</CardDescription>
				</CardHeader>

				<CardContent>
					{/* List Buttons */}
					<div className="admin-section">
						<h3 className="section-title">View Lists</h3>
						<div className="admin-grid">
							<button
								type="button"
								className="admin-big-btn list-btn users"
								onClick={() => {
									openModal("List Users");
									setList(true);
								}}
							>
								<Users className="btn-icon" />
								<span>List Users</span>
							</button>
							<button
								type="button"
								className="admin-big-btn list-btn machines"
								onClick={() => {
									openModal("List Machines");
									setList(true);
								}}
							>
								<Factory className="btn-icon" />
								<span>List Machines</span>
							</button>
							<button
								type="button"
								className="admin-big-btn list-btn sensors"
								onClick={() => {
									openModal("List Sensors");
									setList(true);
								}}
							>
								<Activity className="btn-icon" />
								<span>List Sensors</span>
							</button>
						</div>
					</div>

					{/* Add Buttons */}
					<div className="admin-section">
						<h3 className="section-title">Add New</h3>
						<div className="admin-grid">
							<button
								type="button"
								className="admin-big-btn add-btn users"
								onClick={() => {
									openModal("user");
									setAdd(true);
								}}
							>
								<UserPlus className="btn-icon" />
								<span>Add User</span>
							</button>
							<button
								type="button"
								className="admin-big-btn add-btn machines"
								onClick={() => {
									openModal("machine");
									setAdd(true);
								}}
							>
								<Wrench className="btn-icon" />
								<span>Add Machine</span>
							</button>
							<button
								type="button"
								className="admin-big-btn add-btn sensors"
								onClick={() => {
									openModal("sensor");
									setAdd(true);
								}}
							>
								<PlusCircle className="btn-icon" />
								<span>Add Sensor</span>
							</button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* MODAL — adding new elements so we check if add is true */}
			{add && (
				<Modal isOpen={isOpen} onClose={closeModal}>
					<h2 className="modal-title"> Add new {modalType} </h2>
					{formError && <p style={{ color: "red" }}>{formError} *</p>}

					<div className="modal-form">
						{modalType === "user" && (
							<AddUserForm newUser={newUser} setNewUser={setNewUser} />
						)}

						{modalType === "machine" && (
							<AddMachineForm
								newMachine={newMachine}
								setNewMachine={setNewMachine}
							/>
						)}

						{modalType === "sensor" && (
							<AddSensorForm
								newSensor={newSensor}
								setNewSensor={setNewSensor}
							/>
						)}

						<button
							type="button"
							onClick={handleSubmit}
							className="modal-submit-button"
						>
							Add {modalType?.charAt(0).toUpperCase() + modalType?.slice(1)}
						</button>
					</div>
				</Modal>
			)}

			{/*Modal - of listing */}
			{/*Listing Users */}
			{list && modalType === "List Users" && (
				<Modal isOpen={isOpen} onClose={closeModal}>
					<h2 className="modal-title">{modalType}</h2>
					{FactoryUsers?.data?.map((user) => (
						<div className="list-item" key={user.user_id}>
							<p>
								{user.username}: {user.role.name}{" "}
							</p>
							<DeleteButton
								onClick={() => {
									//when click on delete we select the element to be deleted in a state
									//we close the list modal and open a modal for confirming
									//delete or not
									setSelectedUser(user);
									closeModal();
									setDeletee(true);
									openModal("Confirm deletion of user");
								}}
							/>
						</div>
					))}
				</Modal>
			)}
			{/*Listing Machines */}
			{list && modalType === "List Machines" && (
				<Modal isOpen={isOpen} onClose={closeModal}>
					<h2 className="modal-title">{modalType}</h2>
					{Machines?.data?.map((machine) => (
						<div className="list-item" key={machine.machine_id}>
							<p>
								{machine.name}: {machine.location.name}{" "}
							</p>
							<DeleteButton
								onClick={() => {
									//when click on delete we select the element to be deleted in a state
									//we close the list modal and open a modal for confirming
									//delete or not
									setSelectedMachine(machine);
									closeModal();
									setDeletee(true);
									openModal("Confirm deletion of machine");
								}}
							/>
						</div>
					))}
				</Modal>
			)}
			{/*Listing Sensors */}
			{list && modalType === "List Sensors" && (
				<Modal isOpen={isOpen} onClose={closeModal}>
					<h2 className="modal-title">{modalType}</h2>
					{Sensors?.data?.map((sensor) => (
						<div className="list-item" key={sensor.sensor_id}>
							<p>
								{sensor.name} on machine {sensor.machine.name}{" "}
							</p>
							<DeleteButton
								onClick={() => {
									//when click on delete we select the element to be deleted in a state
									//we close the list modal and open a modal for confirming
									//delete or not
									setSelectedSensor(sensor);
									closeModal();
									setDeletee(true);
									openModal("Confirm deletion of sensor");
								}}
							/>
						</div>
					))}
				</Modal>
			)}
			{/*Modal - of deleting */}
			{/*deleting a machine */}
			{deletee && modalType === "Confirm deletion of machine" && (
				<Modal isOpen={isOpen} onClose={closeModal}>
					<h2 className="modal-title">{modalType}</h2>
					<p>
						Are you sure to delete{" "}
						<span className="deleted-item">{selectedMachine.name}</span> from
						your factory
					</p>
					<ConfirmDeletionButton
						onClick={() => {
							deleteMachine(); //delete the selected machine
							closeModal();
							setSelectedMachine({}); //reinitiate the selected machine state
						}}
					/>
				</Modal>
			)}
			{/*deleting a user */}
			{deletee && modalType === "Confirm deletion of user" && (
				<Modal isOpen={isOpen} onClose={closeModal}>
					<h2 className="modal-title">{modalType}</h2>
					<p>
						Are you sure to delete{" "}
						<span className="deleted-item">{selectedUser.username}</span> from
						your factory
					</p>
					<ConfirmDeletionButton
						onClick={() => {
							deleteUsers(); //delete the selected user
							closeModal();
							setSelectedUser({}); //reinitiate the selected user state
						}}
					/>
				</Modal>
			)}
			{deletee && modalType === "Confirm deletion of sensor" && (
				<Modal isOpen={isOpen} onClose={closeModal}>
					<h2 className="modal-title">{modalType}</h2>
					<p>
						Are you sure to delete{" "}
						<span className="deleted-item">{selectedSensor.name}</span> from
						this machine{" "}
						<span className="deleted-item">{selectedSensor.machine?.name}</span>
					</p>
					<ConfirmDeletionButton
						onClick={() => {
							deleteSensor(); //delete the selected user
							closeModal();
							setSelectedUser({}); //reinitiate the selected user state
						}}
					/>
				</Modal>
			)}
		</div>
	);
};

export default AdminTab;
