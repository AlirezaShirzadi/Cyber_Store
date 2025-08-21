// components/OtpFieldGroup.tsx
import React, { useRef } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface Props {
    name: string;
    length: number;
    watch: UseFormWatch<any>;
    setValue: UseFormSetValue<any>;
}

const OtpFieldGroup: React.FC<Props> = ({ name, length, watch, setValue }) => {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const values = watch(name) || "";

    const handleChange = (index: number, digit: string) => {
        if (!/^\d?$/.test(digit)) return;

        const valArr = values.split("");
        valArr[index] = digit;
        const newValue = valArr.join("").padEnd(length, "");

        setValue(name, newValue);

        if (digit && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace") {
            const valArr = values.split("");
            if (!valArr[index] && index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };

    return (
        <div className="flex gap-2 justify-center" dir="ltr">
            {Array.from({ length }).map((_, i) => (
                <input
                    key={i}
                    ref={(el) => { inputsRef.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={values?.[i] || ""}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-5 md:w-10 h-12 text-center border-b border-b-white text-3xl text-white focus-visible:outline-0"
                />
            ))}
        </div>
    );
};

export default OtpFieldGroup;
