import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "../lib/auth";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ProviderFormProps = {
  width?: number;
  height?: number;
};

const ProviderForm: React.FC<ProviderFormProps> = ({
  width = 30,
  height = 30,
}) => {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server";

        const results = await auth.api.signInSocial({
          body: {
            provider: "github",
          },
          headers: await headers(),
        });

        if (!results.url) {
          throw new Error("No URL returned from auth provider");
        }

        redirect(results.url);
      }}
    >
      <Button
        className="flex items-center justify-evenly w-full"
        type="submit"
        variant="ghost"
      >
        Sign in with GitHub
        <Image
          src="https://img.icons8.com/?size=100&id=106562&format=png&color=000022"
          alt="provider-github"
          width={width}
          height={height}
        />
      </Button>
    </form>
  );
};

export function Login() {
  return (
    <Card className="w-full max-w-sm mx-auto mt-10 bg-base-100 shadow-xl">
      <CardHeader>
        <CardTitle>Connectez vous avec Github !</CardTitle>
      </CardHeader>
      <CardContent>
        <ProviderForm />
      </CardContent>
      <CardFooter>By Melvunx</CardFooter>
    </Card>
  );
}
