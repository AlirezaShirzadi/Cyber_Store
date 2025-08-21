import Container from "@/components/Container/Container";

export default async function Page() {
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
                <div className={`flex flex-col gap-3.5 items-center justify-center min-h-dvh`}>
                    <div className={`p-[19px] bg-[#E1E4FA] w-full rounded-[14px] text-2xl/[116%] text-secondary`}>آیا همه اکانت ها گارانتی مادم المعر دارند و شامل گارانتی میشوند؟</div>
                    <div className={`p-[19px] bg-[#E1E4FA] w-full rounded-[14px] text-2xl/[116%] text-secondary`}>آیا ممکن است اکانت ها باعث بن شدن شوند؟</div>
                    <div className={`p-[19px] bg-[#E1E4FA] w-full rounded-[14px] text-2xl/[116%] text-secondary`}>بهترین ظرفیت کدام است؟</div>
                </div>
            </Container>
        </div>
    </>
}