import { Form } from "@/components/auth/form";
import Image from "next/image";
import Link from "next/link";

export default function AuthenticationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Form />
    </main>
  );
}
