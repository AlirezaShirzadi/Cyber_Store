import Container from "@/components/Container/Container";
import TestimonialSlider from "@/components/TestimonialSlider/TestimonialSlider";
import StoreSlider from "@/components/StoreSlider/StoreSlider";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import Image from "next/image";

export default function Home() {

    return (
        <>
            <Container>
                <section className={`pb-[167px] pt-[197px]`}>
                    <div className={`font-vazir`}>
                        <div className={`grid grid-cols-12 gap-6 items-center`}>
                            <div className={`col-span-12 lg:col-span-5 order-2 lg:order-1`}>
                                <StoreSlider/>
                            </div>
                            <div className={`col-span-12 lg:col-span-7 order-1 lg:order-2`}>
                                <h2 className={`text-4xl lg:text-[60px]/[120px] font-bold text-secondary mb-[9px]`}>به
                                    دنیای بازی‌ها خوش آمدید</h2>
                                <p className={`text-justify text-base text-secondary mb-[23px]`}>لورم ایپسوم متن ساختگی
                                    با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و
                                    متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
                                    مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</p>
                                <TestimonialSlider/>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>

            <section>
                <HeroSlider/>
            </section>

            <Container>
                <section className={`pt-8 pb-[113px]`}>
                    <h2 className={`bg-radial from-[#C1C2EF] text-center text-secondary text-5xl py-1.5 font-bold to-transparent mb-[49px]`}>چرا
                        ما؟</h2>
                    <div className={`grid grid-cols-12 gap-6 max-w-[872px] mx-auto w-full`}>
                        <div className={`col-span-12 lg:col-span-6`}>
                            <Image className={`w-full object-cover`} src={`/why/1.png`} alt={'why1'} width={424} height={308} />
                        </div>
                        <div className={`col-span-12 lg:col-span-6`}>
                            <Image className={`w-full object-cover`} src={`/why/2.png`} alt={'why2'} width={424} height={308} />
                        </div>
                        <div className={`col-span-12 lg:col-span-6`}>
                            <Image className={`w-full object-cover`} src={`/why/3.png`} alt={'why3'} width={424} height={308} />
                        </div>
                        <div className={`col-span-12 lg:col-span-6`}>
                            <Image className={`w-full object-cover`} src={`/why/4.png`} alt={'why4'} width={424} height={308} />
                        </div>
                    </div>
                </section>
            </Container>
        </>
    );
}
