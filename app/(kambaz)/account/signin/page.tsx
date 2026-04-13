"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, FormControl } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      setError("");
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/dashboard");
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Unable to login. Try again later.",
      );
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Signin</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <Button
        onClick={signin}
        id="wd-signin-btn"
        className="w-100 mb-2"
      >
        Signin
      </Button>
      {error && <div className="text-danger mb-2">{error}</div>}
      <Link id="wd-signup-link" href="/account/signup">
        Signup
      </Link>
    </div>
  );
}
