import Container from "@/components/Container/Container";
import TestimonialSlider from "@/components/TestimonialSlider/TestimonialSlider";
import StoreSlider from "@/components/StoreSlider/StoreSlider";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import Image from "next/image";
import HeadsetSlider from "@/components/HeadsetSlider/HeadsetSlider";
import React from "react";
import Link from "next/link";
import PlanSlider from "@/components/PlanSlider/PlanSlider";
import BlogSlider from "@/components/BlogSlider/BlogSlider";
import ConsoleSlider from "@/components/ConsoleSlider/ConsoleSlider";
import AnimatedBackground from "@/components/AnimatedBackground/AnimatedBackground";

export default function Home() {

    return (
        <>
            <AnimatedBackground />
            <Container>
                <section className={`pb-6 lg:pb-[167px] pt-[197px]`}>
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
                            <Image className={`w-full object-cover`} src={`/why/1.png`} alt={'why1'} width={424}
                                   height={308}/>
                        </div>
                        <div className={`col-span-12 lg:col-span-6`}>
                            <Image className={`w-full object-cover`} src={`/why/2.png`} alt={'why2'} width={424}
                                   height={308}/>
                        </div>
                        <div className={`col-span-12 lg:col-span-6`}>
                            <Image className={`w-full object-cover`} src={`/why/3.png`} alt={'why3'} width={424}
                                   height={308}/>
                        </div>
                        <div className={`col-span-12 lg:col-span-6`}>
                            <Image className={`w-full object-cover`} src={`/why/4.png`} alt={'why4'} width={424}
                                   height={308}/>
                        </div>
                    </div>
                </section>
            </Container>

            <Container>
                <section className={`pb-6 lg:pb-20`}>
                    <HeadsetSlider/>
                </section>
            </Container>

            <Container className={`pb-6 lg:pb-[85px]`}>
                <section className={`relative lg:pt-[83px] pb-18 bg-[#c1c2ef80] rounded-tr-[60px] rounded-bl-[30px]`}>
                    <Image className={`absolute bottom-0 left-0`} src={'/robot.webp'} alt={'robot'} width={281}
                           height={184}/>
                    <div className={`pt-12 pb-[170px] lg:py-[180px] px-4 lg:px-24 text-center`}>
                        <h2 className={`text-3xl lg:text-5xl/[52px] font-bold text-secondary mb-12`}>راهنمای خرید</h2>
                        <div className={`text-secondary text-xl lg:text-xl/[75px]`}>
                            <p>1. گیم مورد نظرت رو انتخاب کن</p>
                            <p>2. از طریق درگاه بانکی پرداخت خودتون رو انجام بدید</p>
                            <p>3. اطلاعات مربوط به اکانت خریداری شده رو تو تلگرامت پیگیری کن.</p>
                        </div>
                    </div>
                </section>
            </Container>

            <Container>
                <section className={`text-center pb-[13px]`}>
                    <ConsoleSlider />
                </section>
            </Container>

            <Container>
                <section className={`py-6 lg:py-[129px]`}>
                    <PlanSlider/>
                </section>
            </Container>

            <Container>
                <section className={`pt-[76px] pb-[60px] md:px-6`}>
                    <h2 className={`text-2xl md:text-4xl lg:text-5xl font-bold text-secondary text-center mb-[28px]`}>به‌روزترین اخبار دنیای
                        سونی در سایبر گیم‌استور</h2>
                    <p className={`text-base md:text-lg text-[#3200AEBF] text-justify lg:text-center mb-[28px] px-2 md:px-4 lg:px-0`}>تو بخش اخبار سایبر گیم‌استور، همیشه
                        یه قدم جلوتر از دنیای سونی باش! ما به‌روزترین اخبار رو از بازی‌های جدید، آپدیت‌های کنسول‌های PS4
                        و PS5، رویدادهای ویژه و حتی شایعات هیجان‌انگیز براتون جمع‌آوری کردیم. اینجا هر گیمری می‌تونه
                        سریع و ساده با آخرین اتفاقات دنیای سونی همراه بشه. خبرها رو بخون، نظرت رو بگو و با ما تو جریان
                        باش</p>
                    <BlogSlider/>
                    <div className="relative flex justify-center mt-[107px] mb-[31px] px-4 md:px-6 lg:px-0">
                        <div
                            className="absolute w-full max-w-[600px] h-full rounded-full bg-primary opacity-70 blur-3xl z-0"></div>
                        <Image className={`relative z-10 w-full max-w-[480px] h-auto`} src={`/ps5.png`} alt={`ps5`} width={480} height={320}/>
                    </div>
                    <p className={`text-justify text-base px-4 md:px-6 lg:px-0 w-full overflow-hidden`}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                        با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                        است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                        باشد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
                        است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                        تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</p>
                </section>
            </Container>
        </>
    );
}
