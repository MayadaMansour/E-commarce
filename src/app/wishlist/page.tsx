import WishlistHeader from "@/src/components/wishlist/WishlistHeader";
import { apiServices } from "@/src/app/service/api";

export default async function WishlistPage() {
  const response = await apiServices.getWishListItem();
  return <WishlistHeader initialItems={response?.data || []} />;
}