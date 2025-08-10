"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FiltersData {
    [key: string]: {
        name: string;
        type: "multi_select" | "boolean" | "range";
        options: any;
    };
}

interface Props {
    filters: FiltersData;
    params: any;
}

const ProductFilters: React.FC<Props> = ({ filters, params }) => {
    const router = useRouter();

    const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>(
        {}
    );
    const [priceRange, setPriceRange] = useState<[number, number]>([
        filters?.price?.options?.min,
        filters?.price?.options?.max,
    ]);
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

    // Collapse all filters by default
    useEffect(() => {
        const defaultCollapsed: Record<string, boolean> = {};
        Object.keys(filters).forEach((key) => {
            defaultCollapsed[key] = true;
        });
        setCollapsed(defaultCollapsed);
    }, [filters]);

    useEffect(() => {
        setSelectedFilters((prev) => ({
            ...prev,
            price: { min: priceRange[0], max: priceRange[1] },
        }));
    }, [priceRange]);

    const applyFilters = () => {
        const mergedParams = new URLSearchParams();

        // Keep existing params
        Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v) => mergedParams.append(key, v));
            } else if (value !== undefined && value !== null) {
                mergedParams.set(key, String(value));
            }
        });

        // Add selected filters
        Object.entries(selectedFilters).forEach(([key, value]) => {
            mergedParams.delete(key);
            mergedParams.delete(`${key}_min`);
            mergedParams.delete(`${key}_max`);

            if (value === undefined || value === null) return;

            if (Array.isArray(value)) {
                value.forEach((v) => mergedParams.append(key, v));
            } else if (typeof value === "object") {
                if (value.min !== undefined)
                    mergedParams.set(`${key}_min`, value.min);
                if (value.max !== undefined)
                    mergedParams.set(`${key}_max`, value.max);
            } else {
                mergedParams.set(key, String(value));
            }
        });

        router.push(`?${mergedParams.toString()}`);
    };

    const toggleCollapse = (key: string) => {
        setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleMultiSelect = (key: string, value: string) => {
        setSelectedFilters((prev) => {
            const current = prev[key] || [];
            const updated = current.includes(value)
                ? current.filter((v: string) => v !== value)
                : [...current, value];
            return { ...prev, [key]: updated };
        });
    };

    const handleBooleanChange = (key: string, value: boolean) => {
        setSelectedFilters((prev) => {
            if (prev[key] === value) {
                // Deselect if already selected
                const updated = { ...prev };
                delete updated[key];
                return updated;
            } else {
                return { ...prev, [key]: value };
            }
        });
    };

    return (
        <div className="space-y-4 w-full max-w-md mx-auto">
            {Object.entries(filters).map(([key, filter]) => (
                <div
                    key={key}
                    className="border rounded-lg p-4 bg-white shadow-sm"
                >
                    <div
                        className="flex justify-between items-center cursor-pointer mb-2"
                        onClick={() => toggleCollapse(key)}
                    >
                        <h3 className="font-semibold text-lg">{filter.name}</h3>
                        {collapsed[key] ? <ChevronDown /> : <ChevronUp />}
                    </div>

                    {!collapsed[key] && (
                        <div className="space-y-2 text-sm transition-all">
                            {filter.type === "multi_select" &&
                                (filter.options as string[]).map((option) => (
                                    <label
                                        key={option}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            className="accent-blue-500"
                                            checked={
                                                selectedFilters[key]?.includes(
                                                    option
                                                ) || false
                                            }
                                            onChange={() =>
                                                handleMultiSelect(key, option)
                                            }
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}

                            {filter.type === "boolean" &&
                                (filter.options as boolean[]).map((option) => (
                                    <label
                                        key={String(option)}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="radio"
                                            className="accent-blue-500"
                                            name={key}
                                            checked={
                                                selectedFilters[key] === option
                                            }
                                            onChange={() =>
                                                handleBooleanChange(key, option)
                                            }
                                        />
                                        <span>{option ? "بله" : "خیر"}</span>
                                    </label>
                                ))}

                            {filter.type === "range" && (
                                <NumberRangeInput
                                    min={0}
                                    max={1000000}
                                    minValue={priceRange[0]}
                                    maxValue={priceRange[1]}
                                    onChange={setPriceRange}
                                />
                            )}
                        </div>
                    )}
                </div>
            ))}

            {/* Submit Button */}
            <div className="pt-4">
                <button
                    onClick={applyFilters}
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition cursor-pointer"
                >
                    اعمال فیلترها
                </button>
            </div>
        </div>
    );
};

export default ProductFilters;

// RangeSlider Component
interface NumberRangeInputProps {
    minValue: number;
    maxValue: number;
    min: number;
    max: number;
    onChange: (range: [number, number]) => void;
}

const NumberRangeInput: React.FC<NumberRangeInputProps> = ({
    minValue,
    maxValue,
    min,
    max,
    onChange,
}) => {
    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(Number(e.target.value), maxValue - 1);
        onChange([newMin, maxValue]);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(Number(e.target.value), minValue + 1);
        onChange([minValue, newMax]);
    };

    return (
        <div className="flex flex-wrap items-center gap-4 w-full">
            <div className="flex flex-col w-full">
                <label className="text-sm mb-1 text-gray-600">حداقل قیمت</label>
                <input
                    type="number"
                    min={min}
                    max={maxValue - 1}
                    value={minValue}
                    onChange={handleMinChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <span className="text-gray-500 text-sm">تا</span>

            <div className="flex flex-col w-full">
                <label className="text-sm mb-1 text-gray-600">
                    حداکثر قیمت
                </label>
                <input
                    type="number"
                    min={minValue + 1}
                    max={max}
                    value={maxValue}
                    onChange={handleMaxChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );
};
