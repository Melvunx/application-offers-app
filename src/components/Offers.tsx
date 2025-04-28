"use client";

import { getOffersAction } from "@/app/(main)/dashboard/offer.actions";
import { ArchiveIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Offer, TypeOffer } from "../generated/prisma";
import { formatDate } from "../lib/utils";
import { PaginationsControls } from "./PaginationsControls";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const OfferCard = ({ offer }: { offer: Offer }) => {
  const isJobBoard = offer.type === "JOBBOARD" && offer.description !== null;

  return (
    <Card>
      <CardHeader className="flex flex-col items-start space-y-2">
        <div>
          {offer.isFavorite && (
            <StarIcon className="text-amber-400" size={16} />
          )}
        </div>
        <CardTitle className={offer.isFavorite ? "text-amber-400" : ""}> 
        </CardTitle>
        <CardDescription>{offer.type}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      {isJobBoard && (
        <CardFooter>
          <Link href={`/dashboard/offers/${offer.id}`}>En savoir plus...</Link>
        </CardFooter>
      )}
    </Card>
  );
};

type FilterOffers = {
  type: TypeOffer | "ALL";
  showFavorites: boolean;
  showArchived: boolean;
};

export function OfferList() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filters, setFilters] = useState<FilterOffers>({
    type: "ALL",
    showFavorites: false,
    showArchived: false,
  });

  useEffect(() => {
    const fetchOffers = async () => {
      const offers = await getOffersAction();
      setOffers(offers);
    };

    fetchOffers();
  }, []);

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const typeMatch = filters.type === "ALL" || offer.type === filters.type;

      const favoriteMatch = !filters.showFavorites || offer.isFavorite;

      const archivedMatch = !filters.showArchived || offer.isArchived;
      return typeMatch && favoriteMatch && archivedMatch;
    });
  }, [offers, filters]);

  const handleTypeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, type: value as TypeOffer | "ALL" }));
  };

  const handleFavoriteAndArchivedChange = (value: string[]) => {
    setFilters((prev) => ({
      ...prev,
      showFavorites: value.includes("favorites"),
      showArchived: value.includes("archived"),
    }));
  };

  return (
    <div>
      <div>
        {filteredOffers.length > 0 && (
          <>
            <ToggleGroup
              type="single"
              value={filters.type}
              onValueChange={(value) => handleTypeChange(value || "ALL")}
            >
              <ToggleGroupItem value="ALL">Tous</ToggleGroupItem>
              <ToggleGroupItem value="JOBBOARD">Job Board</ToggleGroupItem>
              <ToggleGroupItem value="SPONTANEOUS">Spontanée</ToggleGroupItem>
            </ToggleGroup>

            <ToggleGroup
              type="multiple"
              value={[
                filters.showFavorites ? "favorites" : "",
                filters.showArchived ? "archived" : "",
              ]}
              onValueChange={(value) => handleFavoriteAndArchivedChange(value)}
            >
              <ToggleGroupItem value="favorites">
                <StarIcon
                  className={filters.showFavorites ? "fill-amber-400" : ""}
                />
              </ToggleGroupItem>
              <ToggleGroupItem value="archived">
                <ArchiveIcon
                  className={filters.showArchived ? "text-green-500" : ""}
                />
              </ToggleGroupItem>
            </ToggleGroup>
          </>
        )}
      </div>
      {filteredOffers.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          Aucune offre trouvée avec ces filtres
        </div>
      ) : (
        filteredOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))
      )}
      <PaginationsControls
        totalItems={filteredOffers.length}
        itemsPerPage={6}
      />
    </div>
  );
}

export function OffersDetailed({ offer }: { offer: Offer }) {
  return (
    <div>
      <div>
        <div>{offer.title}</div>
        <div>{offer.status}</div>
        <div>{formatDate(offer.createdAt)}</div>
      </div>
      <div>{offer.description}</div>
      <ul>
        <li>{formatDate(offer.applyDate)}</li>
        <li>{offer.company}</li>
        <li>{offer.location}</li>
        <li>{offer.url}</li>
      </ul>
    </div>
  );
}
