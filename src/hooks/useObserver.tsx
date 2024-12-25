import React, { useCallback, useRef } from "react";

type UseObserverProps = {
  loading: boolean;
  hasMore: boolean;
  setPageNumber: (
    pageNumber: number | ((prevPageNumber: number) => number)
  ) => void;
};

function useObserver({ loading, hasMore, setPageNumber }: UseObserverProps) {
  console.log("HAS_MORE", hasMore);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("CMOJNKGJKJ..........");
          setPageNumber((prevPageNumber: number) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPageNumber]
  );

  return { observer, lastBookElementRef };
}

export default useObserver;
