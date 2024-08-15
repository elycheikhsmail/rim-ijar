import { cookies } from "next/headers";
import NavAuthUI from "./ui/NavAuthUI";
import NavNonAuthUI from "./ui/NavNonAuth";

export default function ConditionalNav() {
  const isAuthenticated = cookies().has("sessionId");
  console.log({ isAuthenticated });

  return (
    <>
      {isAuthenticated ? <NavAuthUI /> : <NavNonAuthUI />}
    </>
  );
}
