import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useState } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useObserver from "@/hooks/useObserver";
import { FiSend } from "react-icons/fi";
import { ProductType } from "@/types";
import ProductCard from "./ProductCard";

interface Props {
  isSendProductModalOpen: boolean;
  setIsSendProductModalOpen: (value: boolean) => void;
}
type SelectProductType = {
  _id: string;
  link: string;
  image: string;
};
export default function SendProductModal({
  isSendProductModalOpen,
  setIsSendProductModalOpen,
}: Props) {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<any>(null);
  const [text, setText] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<SelectProductType[]>(
    []
  );

  const { loading, resData, hasMore, isError } = useInfiniteScroll<
    Partial<ProductType>
  >({
    pageNumber: pageNumber,
    url: "products",
    isOpen: isSendProductModalOpen,
    query: searchQuery,
  });
  const toggleDrawer = (newOpen: boolean) => () => {
    setIsSendProductModalOpen(newOpen);
  };

  const { lastBookElementRef } = useObserver({
    loading,
    hasMore,
    setPageNumber,
  });

  return (
    <div>
      <Drawer
        open={isSendProductModalOpen}
        onClose={toggleDrawer(false)}
        anchor="right"
      >
        <div className="relative h-full">
          <div className="sticky top-0 h-[3.5rem] z-10 flex items-center justify-center">
            <p className="text-lg font-medium">Product List</p>
          </div>
          <div className="w-[27.9rem] max-h-[calc(100%-7rem)] overflow-y-auto p-3 flex flex-col gap-2 ">
            {resData &&
              resData.map((product: ProductType, index: number) => {
                console.log("Product", product);
                if (resData?.length === index + 1) {
                  return (
                    <div ref={lastBookElementRef} key={product._id}>
                      <ProductCard
                        product={product}
                        setIsSendProductModalOpen={setIsSendProductModalOpen}
                      />
                    </div>
                  );
                } else {
                  return (
                    <ProductCard
                      product={product}
                      key={product?._id}
                      setIsSendProductModalOpen={setIsSendProductModalOpen}
                    />
                  );
                }
              })}

            {loading && (
              <div className="h-[3rem]">
                <p>Loading..</p>
              </div>
            )}

            {isError && (
              <div className="h-[3rem]">
                <p>Error</p>
              </div>
            )}
          </div>
          <div className="sticky bottom-0 h-[3.5rem] z-10 flex items-center justify-end mr-10">
            <button className="p-2 bg-indigo-500 text-white text-xs rounded-md hover:bg-indigo-600 transition">
              <FiSend size={16} />
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
