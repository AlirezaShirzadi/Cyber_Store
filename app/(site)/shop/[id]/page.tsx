import Container from "@/components/Container/Container";
import BuyProduct from "@/components/ShopContent/BuyProduct/BuyProduct";
import RelatedProductsSlider from "@/components/ShopContent/RelatedProductsSlider/RelatedProductsSlider";
import ShopItem from "@/components/ShopContent/ShopItem/ShopItem";
import ShopItemSlider from "@/components/ShopContent/ShopItemSlider/ShopItemSlider";
import TestimonialItem from "@/components/TestimonialItem/TestimonialItem";
import {
    GetRelatedProducts,
    GetShopItemDetails,
} from "@/services/Shop/service";
import {formatPrice} from "@/utils/formatPrice";
import Image from "next/image";
import {ToastContainer} from "react-toastify";

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
                                        {!shopItemDetails?.data
                                            ?.has_discount ? (
                                            <div
                                                className="flex items-center gap-1 mt-1 text-sm font-medium justify-end shrink-0 lg:ms-4">
                                                <span>
                                                    {formatPrice(
                                                        shopItemDetails?.data
                                                            ?.price
                                                    )}
                                                </span>
                                                <span>تومان</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-wrap lg:flex-nowrap items-center lg:gap-10">
                                                <div
                                                    className="flex items-center gap-1 mt-1 text-sm font-medium justify-end shrink-0 lg:ms-4 line-through text-black/50">
                                                    <span>
                                                        {formatPrice(
                                                            shopItemDetails
                                                                ?.data?.price
                                                        )}
                                                    </span>
                                                    <span>تومان</span>
                                                </div>
                                                <div
                                                    className="flex items-center gap-1 mt-1 text-sm font-medium justify-end shrink-0 lg:ms-4">
                                                    <span>
                                                        {formatPrice(
                                                            shopItemDetails
                                                                ?.data
                                                                ?.final_price
                                                        )}
                                                    </span>
                                                    <span>تومان</span>
                                                </div>
                                            </div>
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
                                    feature={shopItemDetails?.data?.feature}
                                />
                            </div>
                            <div className="col-span-12 lg:col-span-6 mb-[21px] order-1 lg:order-2">
                                <Image
                                    className="object-cover mx-auto"
                                    src={shopItemDetails?.data?.image}
                                    alt={shopItemDetails?.data?.title_fa}
                                    width={515}
                                    height={515}
                                />
                            </div>
                        </div>
                    </section>

                    {(shopItemDetails?.data?.galleries?.length > 0 ||
                        shopItemDetails?.data?.description) && (
                        <section className="pb-24 pt-4">
                            <div className="grid grid-cols-12 gap-6 items-center">
                                {shopItemDetails?.data?.galleries?.length >
                                    0 && (
                                        <div
                                            className={`col-span-12 ${
                                                shopItemDetails?.data
                                                    ?.description && "lg:col-span-6"
                                            }`}
                                        >
                                            <ShopItemSlider
                                                data={
                                                    shopItemDetails?.data?.galleries
                                                }
                                            />
                                        </div>
                                    )}
                                {shopItemDetails?.data?.description && (
                                    <div
                                        className={`col-span-12 ${
                                            shopItemDetails?.data?.galleries
                                                ?.length > 0 && "lg:col-span-6"
                                        }`}
                                    >
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
                        <section className="pb-24 pt-4 lg:py-[157px]">
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

                    {shopItemDetails?.data?.comments?.length > 0 && (
                        <section className="pb-24 pt-4">
                            <h2 className="text-center text-3xl lg:text-5xl/[64px] text-secondary mb-[70px] font-bold opacity-75">
                                بازخورد های شما عزیزان
                            </h2>
                            <div className="grid grid-cols-12 gap-6">
                                {shopItemDetails?.data?.comments?.map(
                                    (item: any) => {
                                        return (
                                            <TestimonialItem
                                                key={"testimonial " + id + item}
                                                item={item}
                                            />
                                        );
                                    }
                                )}
                            </div>
                        </section>
                    )}
                </Container>
            </div>
            <ToastContainer/>
        </>
    );
}
