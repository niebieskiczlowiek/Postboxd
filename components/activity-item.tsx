import { Film } from "@/types/film";
import Link from "next/link";
import { StarRating } from "./star-rating";
import { Item, ItemDescription, ItemTitle, ItemMedia, ItemActions } from "./ui/item";

interface ActivityItemProps {
    user: string,
    action: string
    film: Film['title'],
    rating: Film['vote_average'] | undefined
}

const ActivityItem = ({
    user,
    action,
    film,
    rating
}: ActivityItemProps) => {
    return (
        <>
          <Item variant="outline" className="flex items-start flex-nowrap overflow-hidden">
                <ItemMedia>
                  <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-secondary" />
                </ItemMedia>
                <ItemDescription className="flex flex-col gap-0.5">
                  <p>
                    <span className="font-bold text-[hsl(0,0%,95%)]">
                      {user}
                    </span>{" "}
                    <span className="text-muted-foreground">
                      {action}
                    </span>{" "}
                    <Link
                      href="/films/1"
                      className="font-bold text-[hsl(0,0%,95%)] transition-colors hover:text-primary no-underline"
                    >
                      {film}
                    </Link>
                  </p>
                </ItemDescription>
                <ItemActions>
                  {rating && (
                    <StarRating rating={rating/2} size="sm"/>
                  )}
                </ItemActions>
          </Item>
        </>
    )
};

export default ActivityItem;