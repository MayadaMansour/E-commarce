import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CartProduct as ICartProduct } from "@/src/app/interface/cart_interfaces/CartProduct ";
import Image from "next/image";

export default function CartProduct({
  item,
  removeItem,
  updateCount,
}: {
  item: ICartProduct;
  removeItem: (productId: string) => Promise<void>;
  updateCount: (productId: string, count: number) => Promise<void>;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingCount, setIsUpdatingCount] = useState(false);
  const [isIncrease, setIsIncrease] = useState(false);
  const [isDecrease, setIsDecrease] = useState(false);

  async function handleDeleteItem() {
    setIsDeleting(true);
    await removeItem(item.product._id);
    setIsDeleting(false);
  }
  async function handleUpdateItemCount(count: number) {
    if (count > item.count) {
      setIsIncrease(true);
    } else {
      setIsDecrease(true);
    }
    setIsUpdatingCount(true);
    await updateCount(item.product._id, count);
    setIsUpdatingCount(false);
    setIsIncrease(false);
    setIsDecrease(false);
  }

  return (
    <div key={item._id} className="flex gap-4 rounded-lg border bg-card p-4">
      <div className="w-24 shrink-0">
        <AspectRatio
          ratio={1}
          className="overflow-hidden rounded-md bg-muted relative"
        >
          <Image
            src={item.product.imageCover}
            alt={item.product.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        </AspectRatio>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-medium">{item.product.title}</h3>
        </div>

        <div className="flex items-center gap-2">
          <Button
            disabled={item.count == 1 || isUpdatingCount}
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handleUpdateItemCount(item.count - 1)}
          >
            {isDecrease ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <Minus className="size-3" />
            )}
          </Button>
          <span className="w-8 text-center">{item.count}</span>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handleUpdateItemCount(item.count + 1)}
            disabled={isUpdatingCount}
          >
            {isIncrease ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <Plus className="size-3" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <div className="text-right">
          <p className="font-semibold">
            {formatPrice(item.price * item.count)}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatPrice(item.price)} each
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={handleDeleteItem}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="mr-1 size-4 animate-spin" />
          ) : (
            <Trash2 className="mr-1 size-4" />
          )}
          Remove
        </Button>
      </div>
    </div>
  );
}
