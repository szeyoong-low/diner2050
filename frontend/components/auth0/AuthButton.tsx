import { auth0 } from "@/lib/auth0";
import LoginButton from "@/components/auth0/LoginButton";
import LogoutButton from "@/components/auth0/LogoutButton";

export default async function AuthButton() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <div>
      {user ? (
        <LogoutButton />
      ) : (
        <LoginButton />
      )}
    </div>
  );
}