"use client";
import { useState } from "react";
import Container from "@/components/Container/Container";

function AccordionItem({ id, question, answer }: { id: string; question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    const panelId = `${id}-panel`;
    return (
        <div className={`w-full bg-[#E1E4FA] rounded-[14px] overflow-hidden`}>
            <button
                type="button"
                className={`w-full text-right p-[19px] text-2xl/[116%] text-secondary flex items-center justify-between gap-4`}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((o) => !o)}
            >
                <span>{question}</span>
                <span className={`transition-transform duration-200 ${open ? "rotate-45" : "rotate-0"}`}>+</span>
            </button>
            <div
                id={panelId}
                role="region"
                aria-labelledby={id}
                className={`${open ? "max-h-[1000px]" : "max-h-0"} transition-[max-height] duration-300 ease-in-out`}
            >
                <div className={`px-[19px] pb-[19px] text-secondary/80 leading-8 text-justify`}>{answer}</div>
            </div>
        </div>
    );
}

export default function Page() {
    const loremFa = "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.";

    return <>
        <div className={`bg-[#E1E4FA] min-h-dvh`}>
            <Container>
                <h1 className={`pt-[336px] text-center text-2xl lg:text-[60px]/[120px] font-bold mb-[50px]`}>درباره
                    فروشگاه ما و تاریخچه
                    افتتاح آن.​</h1>
                <p className={`text-justify`}>یک وب سایت رسمی و معتبر برای خرید کنسول ، اکانت قانونی و لوازم جانبی
                    گیمینگ است که بین گیمر ها و تمام کسانی که به بازی علاقه دارند مورد توجه قرار گرفته و تلاش می کند تا
                    شما احساس خرید مطمئن و آسان از سایت را داشته باشید. فروشگاه Cyber playStore از آبان سال 1399فعالیت
                    خود را در زمینه فروش بازی های قانونی، گیفت کارت، پلاس و لوازم جانبی پلی استیشن آغاز نموده و همواره
                    در تلاش است با ایجاد آرشیو گسترده ای از بازی ها و آیتم های مختلف پاسخگوی نیاز گیمرهای ایرانی باشد.
                    فلسفه و اولویت تیم حرفه ای Cyber playStore رضایت و امنیت مشتریان عزیز است.​</p>
            </Container>
        </div>
        <div className={`bg-secondary min-h-dvh`}>
            <Container className={`min-h-dvh`}>
                <div className={`flex flex-col gap-3.5 items-center justify-center min-h-dvh w-full`}>
                    <AccordionItem id="q1" question="آیا همه اکانت ها گارانتی مادام‌العمر دارند و شامل گارانتی می‌شوند؟" answer={loremFa} />
                    <AccordionItem id="q2" question="آیا ممکن است اکانت ها باعث بن شدن شوند؟" answer={loremFa} />
                    <AccordionItem id="q3" question="بهترین ظرفیت کدام است؟" answer={loremFa} />
                </div>
            </Container>
        </div>
    </>
}