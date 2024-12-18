import { ProductType } from "@/types";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

const ProductCard = ({
  product,
  setIsSendProductModalOpen,
  setSelectedProducts,
}: {
  product: ProductType;
  setIsSendProductModalOpen: (val: boolean) => void;
  setSelectedProducts: (val: any) => void;
}) => {
  const [isChecked, setIsChecked] = useState(false); // Local state for checkbox

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChecked(checked);

    setSelectedProducts((prev: any) => {
      if (checked) {
        // Add product object { id, image }
        return [
          ...prev,
          {
            id: product._id,
            image: product.productImages?.[0]?.imageUrl || "",
          },
        ];
      } else {
        // Remove product object by ID
        return prev.filter((item) => item.id !== product._id);
      }
    });
  };

  return (
    <div className="flex items-center p-3 bg-white shadow-md rounded-md border border-gray-200">
      {/* Checkbox */}
      <div className="flex-shrink-0">
        <input
          type="checkbox"
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>

      {/* Product Image */}
      <div className="ml-3 flex-shrink-0">
        <img
          src={product?.productImages && product?.productImages[0]?.imageUrl}
          alt="Product Image"
          width={40}
          height={40}
          className="rounded-md w-12 h-12 object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="ml-3 flex-1">
        <h2 className="text-sm font-medium text-gray-800">
          {product?.title || "Product Title"}
        </h2>
        <p className="text-xs text-gray-600 truncate">
          {product?.description?.length > 30 ? product?.description?.slice(0, 30) + "..." : product?.description || "Brief product description."}
        </p>
        <p className="text-sm font-semibold text-indigo-600 mt-1">
          ${product?.price || "0.00"}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
