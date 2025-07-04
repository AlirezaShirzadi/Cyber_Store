"use client";

import Image from "next/image";

export default function BlogItem() {
    return <div className={`h-full bg-primary rounded-xl`}>
        <Image className={`w-full h-[130px] object-cover mb-[9px] rounded-t-xl`} src={`/blog.webp`} alt={`blog`} width={275}
               height={130}/>
        <h3 className={`px-[5px] text-secondary text-xs font-bold mb-2.5`}>آخرین اخبار در مورد ربات بامزه سونی</h3>
        <p className={`text-justify text-[#E1E4FA] mx-[5px] pb-8`}>تو بخش اخبار سایبر گیم‌استور، همیشه یه قدم جلوتر از دنیای سونی باش! ما به‌روزترین اخبار رو از بازی‌های جدید، آپدیت‌های کنسول‌های PS4 و PS5، رویدادهای ویژه و حتی شایعات هیجان‌انگیز براتون جمع‌آوری کردیم. اینجا هر گیمری می‌تونه سریع و ساده با آخرین اتفاقات دنیای سونی همراه بشه. خبرها رو بخون، نظرت رو بگو و با ما تو جریان باش</p>
    </div>
}