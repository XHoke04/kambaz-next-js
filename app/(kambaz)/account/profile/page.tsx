"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { users } from "../../database";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";

type User = (typeof users)[number];

export default function Profile() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const [profile, setProfile] = useState<User | null>(currentUser);

  useEffect(() => {
    setProfile(currentUser);
  }, [currentUser]);

  if (!currentUser || !profile) {
    redirect("/account/signin");
  }

  const signout = () => {
    dispatch(setCurrentUser(null));
    router.push("/account/signin");
  };

  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={profile.username || ""}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={profile.password || ""}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
      />
      <FormControl
        id="wd-firstname"
        placeholder="First Name"
        className="mb-2"
        value={profile.firstName || ""}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
      />
      <FormControl
        id="wd-lastname"
        placeholder="Last Name"
        className="mb-2"
        value={profile.lastName || ""}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
      />
      <FormControl
        id="wd-dob"
        type="date"
        className="mb-2"
        value={profile.dob || ""}
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
      />
      <FormControl
        id="wd-email"
        type="email"
        className="mb-2"
        value={profile.email || ""}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />
      <FormSelect
        id="wd-role"
        className="mb-3"
        value={profile.role || ""}
        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>
      <Button variant="danger" className="w-100" onClick={signout}>
        Signout
      </Button>
    </div>
  );
}
