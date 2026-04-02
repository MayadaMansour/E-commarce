import WishlistHeader from "@/src/components/wishlist/WishlistHeader";
import { apiServices } from "@/src/app/service/api";

export const dynamic = "force-dynamic"; 

export default async function WishlistPage() {
  const response = await apiServices.getWishListItem();

  return (
    <WishlistHeader
      initialItems={Array.isArray(response?.data) ? response.data : []}
    />
  );
}