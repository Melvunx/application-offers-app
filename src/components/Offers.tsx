import Link from "next/link";
import { Offer } from "../generated/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const OfferCard = ({ offer }: { offer: Offer }) => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-start space-y-2">
        <CardTitle>{offer.title ?? "Offre spéciale"}</CardTitle>
        <CardDescription>{offer.type}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Link href={}></Link>
      </CardFooter>
    </Card>
  );
};

export async function Offers() {
  return <div>Enter</div>;
}
