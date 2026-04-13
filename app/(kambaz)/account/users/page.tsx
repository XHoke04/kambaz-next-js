"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FormControl, FormSelect } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import PeopleTable from "../../courses/[cid]/people/Table";
import * as client from "../client";
import { RootState } from "../../store";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const router = useRouter();

  const fetchUsers = async (nextName = name, nextRole = role) => {
    const nextUsers = nextName
      ? await client.findUsersByPartialName(nextName)
      : nextRole
        ? await client.findUsersByRole(nextRole)
        : await client.findAllUsers();
    setUsers(nextUsers);
  };
  const filterUsersByRole = async (nextRole: string) => {
    setRole(nextRole);
    if (nextRole) {
      const users = await client.findUsersByRole(nextRole);
      setUsers(users);
    } else {
      fetchUsers(name, "");
    }
  };
  const filterUsersByName = async (nextName: string) => {
    setName(nextName);
    if (nextName) {
      const users = await client.findUsersByPartialName(nextName);
      setUsers(users);
    } else {
      fetchUsers("", role);
    }
  };
  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
      return;
    }
    if (currentUser.role !== "ADMIN") {
      router.replace("/account/profile");
      return;
    }
    fetchUsers();
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== "ADMIN") {
    return null;
  }

  return (
    <div>
      <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Users
      </button>
      <h3>Users</h3>
      <div className="d-flex gap-2 mb-3">
        <FormControl
          onChange={(e) => filterUsersByName(e.target.value)}
          placeholder="Search people"
          value={name}
          className="float-start w-25 me-2 wd-filter-by-name"
        />
        <FormSelect
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="form-select float-start w-25 wd-select-role"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </FormSelect>
      </div>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
