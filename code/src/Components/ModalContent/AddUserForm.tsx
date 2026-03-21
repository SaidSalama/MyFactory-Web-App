import React from 'react'
import type { Users } from '../../../models/users'
import SelectItem from "../Select/Select";
import Select from '../Select/Select'

const AddUserForm = ({newUser,setNewUser}) => {
    return (
      <>
            <div className="form-group">
                <label className="form-label">Userame</label>
                <input
                    className="form-input"
                    value={newUser.username}
                    onChange={(e) =>
                        setNewUser({ ...newUser, username: e.target.value })
                    }
                    placeholder="Said Salama"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Password</label>
                <input
                    className="form-input"
                    value={newUser.password}
                    onChange={(e) =>
                        setNewUser({ ...newUser, password: e.target.value })
                    }
                    placeholder="********"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Email</label>
                <input
                    className="form-input"
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                    }
                    placeholder="said@factory.com"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Role</label>
                <Select
                    value={newUser.role_id}
                    onValueChange={(v) => setNewUser({ ...newUser, role_id: v })}
                >
                    <SelectItem value={1} >Engineer</SelectItem>
                    <SelectItem value={2}>Technician</SelectItem>
                    <SelectItem value={3}>Director</SelectItem>
                </Select>
            </div>
        </>
  )
}

export default AddUserForm