import Container from "@/components/Container/Container";
import BuyProduct from "@/components/ShopContent/BuyProduct/BuyProduct";
import RelatedProductsSlider from "@/components/ShopContent/RelatedProductsSlider/RelatedProductsSlider";
import ShopItem from "@/components/ShopContent/ShopItem/ShopItem";
import ShopItemSlider from "@/components/ShopContent/ShopItemSlider/ShopItemSlider";
import ProductCommentsList from "@/components/ShopContent/ProductCommentsList/ProductCommentsList";
import {
    GetRelatedProducts,
    GetShopItemDetails,
} from "@/services/Shop/service";
import {formatPrice} from "@/utils/formatPrice";
import {ToastContainer} from "react-toastify";
// import dynamic from "next/dynamic";
// const CommentForm = dynamic(() => import("@/components/ShopContent/CommentForm/CommentForm"), { ssr: false });
import CommentForm from "@/components/ShopContent/CommentForm/CommentForm"
export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    const shopItemDetails = await GetShopItemDetails(id);
    const relatedProducts = await GetRelatedProducts(id);

    return (
        <>
            <div className="bg-[#E1E4FA]">
                <Container>
                    <section className="pt-24 pb-4 lg:py-[157px]">
                        <div className="grid grid-cols-12 gap-6 items-center">
                            <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
                                <h1 className="text-2xl lg:text-5xl/[64px] font-bold text-justify mb-[21px]">
                                    {shopItemDetails?.data?.title_fa}
                                </h1>
                                <div className="flex justify-between items-center mb-[21px]">
                                    <div>
                                        {!(typeof shopItemDetails?.data?.type === "string" && shopItemDetails?.data?.type?.toLowerCase()?.includes("account")) && (
                                            !shopItemDetails?.data?.has_discount ? (
                                                <div className="flex items-center gap-1 mt-1 text-sm font-medium justify-end shrink-0 lg:ms-4">
                                                    <span>
                                                        {formatPrice(shopItemDetails?.data?.price)}
                                                    </span>
                                                    <span>تومان</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-wrap lg:flex-nowrap items-center lg:gap-10">
                                                    <div className="flex items-center gap-1 mt-1 text-sm font-medium justify-end shrink-0 lg:ms-4 line-through text-black/50">
                                                        <span>
                                                            {formatPrice(shopItemDetails?.data?.price)}
                                                        </span>
                                                        <span>تومان</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-1 text-sm font-medium justify-end shrink-0 lg:ms-4">
                                                        <span>
                                                            {formatPrice(shopItemDetails?.data?.final_price)}
                                                        </span>
                                                        <span>تومان</span>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <div className="flex justify-start items-center gap-2">
                                        {Array.from({
                                            length: Number(
                                                shopItemDetails?.data
                                                    ?.average_rating
                                            ),
                                        })?.map((_, index) => {
                                            return (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="19"
                                                    height="19"
                                                    viewBox="0 0 19 19"
                                                    fill="none"
                                                    key={index + " star"}
                                                >
                                                    <path
                                                        d="M9.8877 0L12.0206 6.56434H18.9227L13.3388 10.6213L15.4717 17.1857L9.8877 13.1287L4.30374 17.1857L6.43662 10.6213L0.852658 6.56434H7.75481L9.8877 0Z"
                                                        fill="#112B46"
                                                    />
                                                </svg>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="bg-[#BBC1EF] h-0.5 w-full max-w-[354px] mb-[21px]"/>
                                <BuyProduct
                                    id={id}
                                    is_physical={
                                        shopItemDetails?.data?.is_physical
                                    }
                                    is_available={
                                        shopItemDetails?.data?.is_available
                                    }
                                    type={shopItemDetails?.data?.type}
                                    variants={shopItemDetails?.data?.variants || shopItemDetails?.data?.feature}
                                />
                            </div>
                            <div className="col-span-12 lg:col-span-6 mb-[21px] order-1 lg:order-2">
                                <ShopItemSlider
                                    data={[shopItemDetails?.data?.image, ...(shopItemDetails?.data?.galleries || [])]}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Specifications / Features section */}
                    {(() => {
                        const specs = shopItemDetails?.data?.specifications as any;
                        // Normalize specs to array of [key, value]
                        let entries: Array<{ key: string; value: any }> = [];
                        if (specs && typeof specs === "object") {
                            if (Array.isArray(specs)) {
                                entries = specs
                                    .map((it: any) => {
                                        if (!it) return null;
                                        const k = it.key ?? it.name ?? it.title ?? it.label;
                                        const v = it.value ?? it.val ?? it.content ?? it.description ?? it.desc;
                                        if (k == null || v == null || String(v).trim() === "") return null;
                                        return { key: String(k), value: v };
                                    })
                                    .filter(Boolean) as Array<{ key: string; value: any }>;
                            } else {
                                entries = Object.entries(specs)
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    .filter(([_, v]) => v != null && String(v).trim() !== "")
                                    .map(([k, v]) => ({ key: String(k), value: v }));
                            }
                        }
                        return entries.length > 0 ? (
                            <section className="pb-24 pt-4">
                                <h2 className="text-3xl lg:text-5xl/[64px] text-secondary mb-[21px] font-bold opacity-75">
                                    مشخصات محصول
                                </h2>
                                <div className="grid grid-cols-12 gap-6">
                                    {entries.map((item, idx) => (
                                        <div key={`spec-${idx}`} className="col-span-12 md:col-span-6 lg:col-span-4">
                                            <div className="border border-[#BBC1EF] rounded-3xl py-[13px] px-[14px] h-full">
                                                <div className="flex flex-wrap items-start justify-between gap-3">
                                                    <span className="text-sm font-semibold text-secondary line-clamp-2">{item.key}</span>
                                                    <span className="text-sm text-secondary/80 text-left break-words line-clamp-3">{String(item.value)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ) : null;
                    })()}

                    {shopItemDetails?.data?.description && (
                        <section className="pb-24 pt-4">
                            <div className="grid grid-cols-12 gap-6 items-center">
                                {shopItemDetails?.data?.description && (
                                    <div className="col-span-12">
                                        <h2 className="text-3xl lg:text-5xl/[64px] text-secondary mb-[21px] font-bold opacity-75">
                                            توضیحات
                                        </h2>
                                        <div
                                            className="[&>*]:text-justify!"
                                            dangerouslySetInnerHTML={{
                                                __html: shopItemDetails?.data
                                                    ?.description,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {relatedProducts?.data?.results?.length > 0 && (
                        <section className="pb-6 pt-4 lg:py-12">
                            <h2 className="text-center text-3xl lg:text-5xl/[64px] text-secondary mb-[21px] font-bold opacity-75">
                                محصولات پیشنهادی
                            </h2>
                            <div className="block lg:hidden">
                                <RelatedProductsSlider
                                    data={relatedProducts?.data?.results}
                                />
                            </div>
                            <div className="my-8 lg:my-[110px] hidden lg:grid grid-cols-12 gap-6">
                                {relatedProducts?.data?.results?.map(
                                    (item: any) => {
                                        return (
                                            <ShopItem
                                                key={item?.id}
                                                item={item}
                                                view={"items"}
                                            />
                                        );
                                    }
                                )}
                            </div>
                        </section>
                    )}

                    {/* Comment form section */}
                    <section className="pb-12 pt-4">
                        <h2 className="text-center text-2xl lg:text-4xl text-secondary mb-6 font-bold opacity-75">
                            نظر خود را ثبت کنید
                        </h2>
                        <div className="max-w-3xl mx-auto">
                            <CommentForm productId={Number(id)} />
                        </div>
                    </section>

                    {/* Comments List fetched from /product/comments/ with lazy load */}
                    <ProductCommentsList productId={Number(id)} />
                </Container>
            </div>
            <ToastContainer/>
        </>
    );
}
