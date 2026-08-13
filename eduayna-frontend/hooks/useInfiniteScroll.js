"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function useInfiniteScroll({
  fetchData,
  getItems = (data) => data?.items || [],
  limit = 6,
  enabled = true,
  loadOnMount = true,
  root = null,
  rootMargin = "200px",
  threshold = 0,
  initialItems = [],
} = {}) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loaderRef = useRef(null);
  const fetchingRef = useRef(false);
  const mountedFetchRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (!enabled || !fetchData || fetchingRef.current || !hasMore) return;

    fetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData({
        limit,
        skip: page * limit,
        page,
      });

      if (data?.error) {
        setHasMore(false);
        setError(data?.message || "Failed to load data.");
        return;
      }

      const nextItems = getItems(data) || [];

      if (!nextItems.length) {
        setHasMore(false);
        return;
      }

      setItems((prev) => [...prev, ...nextItems]);
      setPage((prev) => prev + 1);

      if (data?.hasMore === false || nextItems.length < limit) {
        setHasMore(false);
      }
    } catch (err) {
      setHasMore(false);
      setError(err?.message || "Something went wrong while loading data.");
    } finally {
      fetchingRef.current = false;
      setLoading(false);
    }
  }, [enabled, fetchData, getItems, hasMore, limit, page]);

  const reset = useCallback(() => {
    fetchingRef.current = false;
    mountedFetchRef.current = false;
    setItems([]);
    setPage(0);
    setHasMore(true);
    setLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    if (!loadOnMount || mountedFetchRef.current) return;
    mountedFetchRef.current = true;
    loadMore();
  }, [loadMore, loadOnMount]);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!enabled || !loader || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) loadMore();
      },
      {
        root: root?.current || null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(loader);

    return () => observer.disconnect();
  }, [enabled, hasMore, loadMore, root, rootMargin, threshold]);

  return {
    items,
    setItems,
    page,
    hasMore,
    loading,
    error,
    loaderRef,
    loadMore,
    reset,
  };
}
