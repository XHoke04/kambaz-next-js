"use client";

import { useEffect, useState } from "react";
import { FormControl, FormSelect } from "react-bootstrap";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../account/client";

export default function PeopleDetails({
  uid,
  onClose,
  fetchUsers,
}: {
  uid: string | null;
  onClose: () => void | Promise<void>;
  fetchUsers?: () => void | Promise<void>;
}) {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setName(`${user.firstName} ${user.lastName}`.trim());
    setEmail(user.email || "");
    setRole(user.role || "USER");
    setEditing(false);
  };

  useEffect(() => {
    if (uid) {
      fetchUser();
    }
  }, [uid]);

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    await fetchUsers?.();
    await onClose();
  };

  const saveUser = async () => {
    if (!user) return;
    const [firstName = "", ...rest] = name.trim().split(/\s+/);
    const lastName = rest.join(" ");
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email,
      role,
    };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    await fetchUsers?.();
    await onClose();
  };

  if (!uid || !user) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={onClose} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 text-danger wd-edit"
            style={{ cursor: "pointer" }}
          />
        )}
        {editing && (
          <FaCheck
            onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 text-danger wd-save"
            style={{ cursor: "pointer" }}
          />
        )}
        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)} style={{ cursor: "pointer" }}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {editing && (
          <FormControl
            className="w-50 wd-edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>
      {!editing && (
        <>
          <b>Roles:</b> <span className="wd-roles">{user.role}</span> <br />
        </>
      )}
      {editing && (
        <>
          <b>Role:</b>{" "}
          <FormSelect
            className="w-75 mb-2 wd-edit-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
            <option value="TA">Assistant</option>
          </FormSelect>
        </>
      )}
      <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span> <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span> <br />
      {!editing && (
        <>
          <b>Email:</b> <span className="wd-email">{user.email}</span> <br />
        </>
      )}
      {editing && (
        <>
          <b>Email:</b>{" "}
          <FormControl
            type="email"
            className="w-75 mb-2 wd-edit-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </>
      )}
      <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button
        onClick={onClose}
        className="btn btn-secondary float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}
