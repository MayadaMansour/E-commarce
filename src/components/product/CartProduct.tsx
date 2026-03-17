import  { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CartProduct as ICartProduct } from "@/src/app/interface/cart_interfaces/CartProduct ";

export default function CartProduct({
  item,
  removeItem,
}: {
item: ICartProduct;
  removeItem: (productId: string) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteItem() {
    setIsLoading(true);
    await removeItem(item.product._id);
    setIsLoading(false);
  }

  return (
    <div key={item._id} className="flex gap-4 rounded-lg border bg-card p-4">
      <div className="w-24 shrink-0">
        <AspectRatio ratio={1} className="overflow-hidden rounded-md bg-muted">
          <img
            src={item.product.imageCover}
            alt={item.product.title}
            className="size-full object-cover"
          />
        </AspectRatio>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-medium">{item.product.title}</h3>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            // onClick={() => updateQuantity(item.id, -1)}
          >
            <Minus className="size-3" />
          </Button>
          <span className="w-8 text-center">{item.count}</span>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            // onClick={() => updateQuantity(item.id, 1)}
          >
            <Plus className="size-3" />
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
          disabled={isLoading}
        >
          {isLoading ? (
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
