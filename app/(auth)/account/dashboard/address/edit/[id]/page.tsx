"use client"

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import Container from "@/components/Container/Container";
import { getProvinces, getCities } from "@/services/Location/service";
import { EditAddress, GetAddressById } from "@/services/Account/service";

type Province = { id: number; name: string };
type City = { id: number; name: string };

type AddressFormValues = {
  title: string;
  phone_number: string;
  province: number | string;
  city: number | string;
  address: string;
  postal_code: string;
  is_default: boolean;
};

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({
    defaultValues: {
      title: "",
      phone_number: "",
      province: "",
      city: "",
      address: "",
      postal_code: "",
      is_default: false,
    },
    mode: "onSubmit",
  });

  // Load provinces on mount
  useEffect(() => {
    let mounted = true;
    async function loadProvinces() {
      setLoadingProvinces(true);
      try {
        const res = await getProvinces();
        const list: Province[] = Array.isArray(res?.data)
          ? (Array.isArray(res.data[0]) ? res.data[0] : res.data)
          : [];
        if (mounted) setProvinces(list as Province[]);
      } catch {
        if (mounted) setProvinces([]);
      } finally {
        if (mounted) setLoadingProvinces(false);
      }
    }
    loadProvinces();
    return () => {
      mounted = false;
    };
  }, []);

  // Load address by id and prefill form
  useEffect(() => {
    const mounted = true;
    async function loadAddress() {
      if (!id) return;
      setLoadingAddress(true);
      try {
        const res = await GetAddressById(String(id));
        const data = res?.data;
        if (data && mounted) {
          // Prefill basic fields first
          reset({
            title: data.title ?? "",
            phone_number: data.phone_number ?? "",
            province: data.province != null ? String(data.province) : "",
            city: "",
            address: data.address ?? "",
            postal_code: data.postal_code ?? "",
            is_default: !!data.is_default,
          });
          // Then load cities for the province and set city
          if (data.province) {
            try {
              setLoadingCities(true);
              const cityRes = await getCities(String(data.province));
              const list: City[] = Array.isArray(cityRes?.data)
                ? (Array.isArray(cityRes.data[0]) ? cityRes.data[0] : cityRes.data)
                : [];
              setCities(list);
              setValue("city", data.city != null ? String(data.city) : "");
            } catch {
              setCities([]);
              setValue("city", "");
            } finally {
              setLoadingCities(false);
            }
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingAddress(false);
      }
    }
    loadAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, reset, setValue]);

  // Watch province changes to load cities
  const selectedProvince = watch("province");
  useEffect(() => {
    async function loadCities() {
      if (!selectedProvince) {
        setCities([]);
        setValue("city", "");
        return;
      }
      setLoadingCities(true);
      try {
        const res = await getCities(String(selectedProvince));
        const list: City[] = Array.isArray(res?.data)
          ? (Array.isArray(res.data[0]) ? res.data[0] : res.data)
          : [];
        setCities(list as City[]);
        // when province changed manually, reset city
        setValue("city", "");
      } catch {
        setCities([]);
        setValue("city", "");
      } finally {
        setLoadingCities(false);
      }
    }
    loadCities();
  }, [selectedProvince, setValue]);

  const onSubmit = async (form: AddressFormValues) => {
    if (!id) return;
    setSubmitting(true);
    try {
      const payload = {
        title: form.title,
        phone_number: form.phone_number,
        province: Number(form.province),
        city: Number(form.city),
        address: form.address,
        postal_code: form.postal_code,
        is_default: !!form.is_default,
      };

      const res = await EditAddress(String(id), payload);
      if (res) {
        router.push("/account/dashboard/address");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const provinceOptions = useMemo(() => provinces, [provinces]);
  const cityOptions = useMemo(() => cities, [cities]);

  return (
    <div className="bg-[#E1E4FA] min-h-dvh pb-12">
      <Container>
        <div className={`pt-[121px] pb-[27px] text-secondary text-3xl lg:text-5xl font-bold`}>ویرایش آدرس</div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-[#D2D5EE] rounded-[14px] p-6 grid grid-cols-1 gap-4 max-w-2xl mx-auto">
          {loadingAddress && (
            <div className="text-secondary">در حال بارگذاری اطلاعات آدرس...</div>
          )}

          <div className="grid gap-1">
            <label className="text-sm font-medium text-secondary">عنوان آدرس</label>
            <input
              className="bg-white rounded-[5px] focus-visible:outline-0 py-[7px] px-2.5"
              {...register("title", { required: "عنوان الزامی است" })}
              placeholder="مثلاً خانه یا محل کار"
            />
            {errors.title && <span className="text-red-600 text-xs">{errors.title.message}</span>}
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium text-secondary">شماره تماس</label>
            <input
              className="bg-white py-[7px] px-2.5 rounded-[5px] focus-visible:outline-0"
              {...register("phone_number", { required: "شماره تماس الزامی است" })}
              placeholder="0912*******"
            />
            {errors.phone_number && <span className="text-red-600 text-xs">{errors.phone_number.message}</span>}
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium text-secondary">استان</label>
            <select
              className="bg-white py-[7px] px-2.5 rounded-[5px] focus-visible:outline-0"
              {...register("province", { required: "استان الزامی است" })}
              disabled={loadingProvinces}
            >
              <option value="">{loadingProvinces ? "در حال بارگذاری..." : "انتخاب استان"}</option>
              {provinceOptions.map((p) => (
                <option key={p.id} value={String(p.id)}>{p.name}</option>
              ))}
            </select>
            {errors.province && <span className="text-red-600 text-xs">{errors.province.message as string}</span>}
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium text-secondary">شهر</label>
            <select
              className="bg-white py-[7px] px-2.5 rounded-[5px] focus-visible:outline-0"
              {...register("city", { required: "شهر الزامی است" })}
              disabled={!watch("province") || loadingCities}
            >
              <option value="">{loadingCities ? "در حال بارگذاری..." : "انتخاب شهر"}</option>
              {cityOptions.map((c) => (
                <option key={c.id} value={String(c.id)}>{c.name}</option>
              ))}
            </select>
            {errors.city && <span className="text-red-600 text-xs">{errors.city.message as string}</span>}
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium text-secondary">نشانی کامل</label>
            <textarea
              className="bg-white py-[7px] px-2.5 rounded-[5px] focus-visible:outline-0 min-h-24"
              {...register("address", { required: "نشانی الزامی است" })}
              placeholder="خیابان، کوچه، پلاک، واحد"
            />
            {errors.address && <span className="text-red-600 text-xs">{errors.address.message}</span>}
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium text-secondary">کد پستی</label>
            <input
              className="bg-white py-[7px] px-2.5 rounded-[5px] focus-visible:outline-0"
              {...register("postal_code", { required: "کد پستی الزامی است" })}
              placeholder="XXXXXXXXXX"
            />
            {errors.postal_code && <span className="text-red-600 text-xs">{errors.postal_code.message}</span>}
          </div>

          <label className="inline-flex items-center gap-2 mt-2">
            <input type="checkbox" {...register("is_default")} />
            <span className="text-sm text-secondary">تنظیم به عنوان آدرس پیش‌فرض</span>
          </label>

          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary rounded-[7px] py-[7px] px-3.5 text-white disabled:opacity-50"
            >
              {submitting ? "در حال ثبت..." : "ذخیره تغییرات"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/account/dashboard/address")}
              className="bg-[#BBC1EF] text-secondary py-[6px] px-[10px] rounded-[5px]"
            >
              انصراف
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}
