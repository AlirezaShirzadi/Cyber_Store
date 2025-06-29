import Container from "@/components/Container/Container";
import TestimonialSlider from "@/components/TestimonialSlider/TestimonialSlider";

export default function Home() {
    return (
        <Container>
            <section className={`pb-[167px] pt-[197px]`}>
                <div className={`font-vazir`}>
                    <div className={`grid grid-cols-12 gap-6`}>
                        <div className={`col-span-12 lg:col-span-5`}></div>
                        <div className={`col-span-12 lg:col-span-7`}>
                            <h2 className={`text-4xl lg:text-[60px]/[120px] font-bold text-secondary mb-[9px]`}>به دنیای بازی‌ها خوش آمدید</h2>
                            <p className={`text-justify text-base text-secondary mb-[23px]`}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</p>
                            <TestimonialSlider/>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
}
