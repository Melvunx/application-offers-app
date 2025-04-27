import { OffersDetailed } from "@/src/components/Offers";
import { redirect } from "next/navigation";
import { getOfferByIdAction } from "../../offer.actions";

export default async function Page(props: {
  params: Promise<{ offerId: string }>;
}) {
  const { offerId } = await props.params;

  const offer = await getOfferByIdAction(offerId);

  if (!offer || !offer.description) redirect("/dashboard");

  return (
    <div>
      <OffersDetailed offer={offer} />
    </div>
  );
}
