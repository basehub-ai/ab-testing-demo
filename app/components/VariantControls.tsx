"use client";

import { VariantsEnum } from "@/basehub-types";
import { setVariant } from "../actions/variant-actions";

interface VariantControlsProps {
  currentVariant: VariantsEnum;
  availableVariants: VariantsEnum[];
}

export function VariantControls({
  currentVariant,
  availableVariants,
}: VariantControlsProps) {
  const handleResetCookie = () => {
    setVariant(null);
  };

  const handleVariantChange = (newVariant: string) => {
    setVariant(newVariant);
  };

  return (
    <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <div className="flex flex-col gap-3 text-sm">
        <div className="text-gray-600 dark:text-gray-300">
          <span className="font-medium">Selected variant:</span>{" "}
          {currentVariant}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-600 dark:text-gray-300 font-medium">
            Select another variant:
          </label>
          <select
            value={currentVariant}
            onChange={(e) => handleVariantChange(e.target.value)}
            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white text-sm"
          >
            {availableVariants.map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleResetCookie}
          className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors duration-200"
        >
          Reset cookie and refresh
        </button>
      </div>
    </div>
  );
}
