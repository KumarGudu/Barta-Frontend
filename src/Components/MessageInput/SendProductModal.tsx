import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useState } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useObserver from "@/hooks/useObserver";
import { FiSend } from "react-icons/fi";
import { ProductType } from "@/types";
import ProductCard from "./ProductCard";
import useCurrentPrivateChatRoomStore from "@/stores/CurrentPvtChat.store";
import { usePostData } from "@/hooks/Api_Hooks";
import { BASE_FRONT_URL, BASE_URL } from "@/utils";

interface Props {
  isSendProductModalOpen: boolean;
  setIsSendProductModalOpen: (value: boolean) => void;
}
type SelectProductType = {
  _id: string;
  image: string;
};
export default function SendProductModal({
  isSendProductModalOpen,
  setIsSendProductModalOpen,
}: Props) {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<any>(null);
  const [text, setText] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const { currentRoom } = useCurrentPrivateChatRoomStore();

  const { loading, resData, hasMore, isError } = useInfiniteScroll<
    Partial<ProductType>
  >({
    pageNumber: pageNumber,
    url: `product?status=ACTIVE`,
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

  const { data, error, isLoading, postData } = usePostData<any>();

  const handleSendProduct = async () => {
    for (const product of selectedProducts) {
      await postData(
        "chat/send-product-in-chat",
        {
          productLink: `${BASE_FRONT_URL}/product/details/${product?.id}`,
          productImage: product?.image,
          groupId: currentRoom?.roomId,
          type: "HOUSE",
        },
        {
          withCredentials: true,
        },
        true
      );
    }

    setIsSendProductModalOpen(false);
    setSelectedProducts([]);
  };

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
          <div className="md:w-[27.9rem] w-full h-[calc(100%-7rem)] max-h-[calc(100%-7rem)] overflow-y-auto p-3 flex flex-col gap-2">
            {resData &&
              resData.map((product: ProductType, index: number) => {
                if (resData?.length === index + 1) {
                  return (
                    <div ref={lastBookElementRef} key={product._id}>
                      <ProductCard
                        product={product}
                        setIsSendProductModalOpen={setIsSendProductModalOpen}
                        setSelectedProducts={setSelectedProducts}
                      />
                    </div>
                  );
                } else {
                  return (
                    <ProductCard
                      product={product}
                      key={product?._id}
                      setIsSendProductModalOpen={setIsSendProductModalOpen}
                      setSelectedProducts={setSelectedProducts}
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
            <button
              className="p-2 bg-indigo-500 text-white text-xs rounded-md hover:bg-indigo-600 transition"
              onClick={handleSendProduct}
            >
              <FiSend size={16} />
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
