"use client";

import { createOfferAction } from "@/app/(main)/dashboard/offer.actions";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Status, TypeOffer } from "../generated/prisma";
import { getRequiredUser } from "../lib/auth-session";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";

const getUserId = async () => {
  const user = await getRequiredUser();

  if ("redirect" in user) redirect(user.redirect);

  return user.id;
};

export function OfferForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [date, setDate] = useState<Date>();

  const handleSwitchChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <form
      action={async (formData) => {
        "user server";

        const titleValue = formData.get("title") as string;
        const descriptionValue = formData.get("description") as string;
        const userId = await getUserId();

        const credentials = {
          title: titleValue === "" ? null : titleValue,
          type: formData.get("type") as TypeOffer,
          isArchived: false,
          isFavorite: false,
          company: formData.get("company") as string,
          url: formData.get("url") as string,
          applyDate: date ? date.toISOString() : new Date().toISOString(),
          description: descriptionValue === "" ? null : descriptionValue,
          status: formData.get("status") as Status,
          location: formData.get("location") as string,
          userId,
        };

        await createOfferAction(credentials);
      }}
    >
      <Label htmlFor="tit">Title</Label>
      <Input
        id="tit"
        name="title"
        type="text"
        placeholder="Enter the title of the offer"
        min={1}
        disabled={isChecked}
        required
      />
      <Label htmlFor="desc">Description</Label>
      <Input
        id="desc"
        name="description"
        type="text"
        placeholder="Enter the description of the offer"
        min={1}
        required
      />
      <Label htmlFor="loc">Lieu</Label>
      <Input
        id="loc"
        name="location"
        type="text"
        placeholder="Enter the location of the offer"
        required
      />
      <Label htmlFor="url">URL</Label>
      <Input
        id="url"
        name="url"
        type="url"
        placeholder="Enter the url of the offer"
        required
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div>
        <Switch
          id="switch"
          checked={isChecked}
          onCheckedChange={(checked) => handleSwitchChange(checked)}
        />
        <Label htmlFor="switch">Offre spontannée</Label>

        <input
          type="hidden"
          name="type"
          value={isChecked ? "SPONTANEOUS" : "BYOFFER"}
        />
      </div>
      <Select name="status">
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner un status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Votre status</SelectLabel>
            <SelectItem value="PENDING">En attente</SelectItem>
            <SelectItem value="ACCEPTED">Accepté</SelectItem>
            <SelectItem value="INTERVIEW">Entretien</SelectItem>
            <SelectItem value="REJECTED">Rejeté</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </form>
  );
}
