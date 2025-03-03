import Link from "next/link";
import CartButton from "./cart-button";
import UserButton from "./user-button";

export default function Menu() {
  return (
    <div className="flex justify-end">
      <nav className="flex gap-3 w-full">
        <CartButton />
        <Link href="/sign-in" className="flex items-center header-button">
          - Hello, Sign in
          <UserButton />-{" "}
        </Link>
      </nav>
    </div>
  );
}
