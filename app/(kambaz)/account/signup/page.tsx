import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h1>Signup</h1>
      <FormControl id="wd-username" placeholder="username" className="mb-2"
        defaultValue="alice"/>
      <FormControl id="wd-password" placeholder="password" type="password"
        className="mb-2" defaultValue="123"/>
      <FormControl id="wd-verify-password" placeholder="verify password" type="password"
        className="mb-2" defaultValue="123"/>
      <Link id="wd-signup-btn" href="/account/profile" className="btn btn-primary w-100 mb-2">
        Signup
      </Link>
      <Link id="wd-signin-link" href="/account/signin">
        Signin
      </Link>
    </div>
  );
}
