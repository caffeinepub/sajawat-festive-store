import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FestivalTag, InquiryType, ProductCategory } from "../backend.d";
import type { Inquiry, Product } from "../backend.d";
import { useActor } from "./useActor";

export function useSeedAndFeaturedProducts() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  return useQuery<Product[]>({
    queryKey: ["featured-products"],
    queryFn: async () => {
      if (!actor) return [];
      await actor.seedSampleProducts();
      const products = await actor.getFeaturedProducts();
      // Invalidate category queries so they also reload fresh data
      queryClient.invalidateQueries({ queryKey: ["products-category"] });
      queryClient.invalidateQueries({ queryKey: ["products-festival"] });
      queryClient.invalidateQueries({ queryKey: ["search-products"] });
      return products;
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["featured-products-only"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProducts();
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useProductsByCategory(category: ProductCategory | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products-category", category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching && category !== null,
    staleTime: 2 * 60 * 1000,
  });
}

export function useProductsByFestivalTag(tag: FestivalTag | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products-festival", tag],
    queryFn: async () => {
      if (!actor || !tag) return [];
      return actor.getProductsByFestivalTag(tag);
    },
    enabled: !!actor && !isFetching && tag !== null,
    staleTime: 2 * 60 * 1000,
  });
}

export function useSearchProducts(name: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["search-products", name],
    queryFn: async () => {
      if (!actor || !name.trim()) return [];
      return actor.searchProductsByName(name.trim());
    },
    enabled: !!actor && !isFetching && name.trim().length > 0,
    staleTime: 30 * 1000,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      email: string;
      message: string;
      inquiryType: InquiryType;
      productInterest: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(
        data.name,
        data.phone,
        data.email,
        data.message,
        data.inquiryType,
        data.productInterest,
      );
    },
  });
}

export type { Product, Inquiry };
export { FestivalTag, InquiryType, ProductCategory };
