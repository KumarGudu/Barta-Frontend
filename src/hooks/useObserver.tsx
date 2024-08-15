import React, { useCallback, useRef } from "react";

type UseObserverProps = {
  loading: boolean;
  hasMore: boolean;
  setPageNumber: (
    pageNumber: number | ((prevPageNumber: number) => number)
  ) => void;
};

function useObserver({ loading, hasMore, setPageNumber }: UseObserverProps) {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useCallback(
    (node: HTMLElement | null) => {
      console.log("Node", node);
      if (loading) return;
      if (observer.current) {
        console.log("Coming..>>>>>>>>.");
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        console.log("Entries", entries);
        if (entries[0].isIntersecting && hasMore) {
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
