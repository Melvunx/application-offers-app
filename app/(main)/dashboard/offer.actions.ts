import { prisma } from "@/src/lib/prisma";
import { OfferCreateSchema, OfferCreateType } from "@/src/schema/offer";
import { z } from "better-auth";

export const idValidateSchema = z.string().uuid().nonempty();

export const getOffersAction = async () => {
  try {
    const offers = await prisma.offer.findMany();

    return offers;
  } catch (error) {
    console.error("Error fetching offers:", error);
    throw new Error("Failed to fetch offers");
  }
};

export const getOfferByIdAction = async (offerId: string) => {
  try {
    const parsedId = idValidateSchema.parse(offerId);

    const offer = await prisma.offer.findUnique({ where: { id: parsedId } });

    return offer;
  } catch (error) {
    console.error("Error fetching offer by ID:", error);
    throw new Error("Failed to fetch offer by ID");
  }
};

export const createOfferAction = async (offerData: OfferCreateType) => {
  try {
    const parsedData = OfferCreateSchema.parse(offerData);

    const offer = await prisma.offer.create({ data: parsedData });

    return offer;
  } catch (error) {
    console.error("Error creating offer:", error);
    throw new Error("Failed to create offer");
  }
};

export const updateOfferAction = async (
  offerId: string,
  offerData: OfferCreateType
) => {
  try {
    const parsedId = idValidateSchema.parse(offerId);

    const parsedData = OfferCreateSchema.parse(offerData);

    const updatedOffer = await prisma.offer.update({
      where: { id: parsedId },
      data: parsedData,
    });

    return updatedOffer;
  } catch (error) {
    console.error("Error updating offer:", error);
    throw new Error("Failed to update offer");
  }
};

export const updateIsArchivedOfferAction = async (
  offerId: string,
  isArchived: boolean
) => {
  try {
    const parsedId = idValidateSchema.parse(offerId);

    const updatedArchive = await prisma.offer.update({
      where: { id: parsedId },
      data: { isArchived, isFavorite: false },
      select: {
        id: true,
        isArchived: true,
      },
    });

    return updatedArchive;
  } catch (error) {
    console.error("Error updating offer:", error);
    throw new Error("Failed to update offer");
  }
};

export const updateIsFavoriteOfferAction = async (
  offerId: string,
  isFavorite: boolean
) => {
  try {
    const parsedId = idValidateSchema.parse(offerId);

    const updatedArchive = await prisma.offer.update({
      where: { id: parsedId },
      data: { isFavorite },
      select: {
        id: true,
        isFavorite: true,
      },
    });

    return updatedArchive;
  } catch (error) {
    console.error("Error updating offer:", error);
    throw new Error("Failed to update offer");
  }
};

export const deleteOfferAction = async (offerId: string) => {
  try {
    const parsedId = idValidateSchema.parse(offerId);

    await prisma.offer.delete({
      where: { id: parsedId },
    });

    return { message: "Offer deleted successfully" };
  } catch (error) {
    console.error("Error deleting offer:", error);
    throw new Error("Failed to delete offer");
  }
};
