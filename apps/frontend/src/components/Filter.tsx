import { useRef, useState } from "react";

type FiltersProps = {
  label: string;
  options: string[];
  callback?: (...args : any[]) => void;
};

const Filters = ({ label, options, callback = () => null }: FiltersProps) => {
  const filtersRef = useRef(new Set())
  const onClickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filters = filtersRef.current
    if (e.target.checked)
      filters.add(e.target.value)
    else
      filters.delete(e.target.value)
    callback({ [label]: Array.from(filters).toString() })
  }
  return (
    <>
      <h3 className="mb-2 font-semibold text-gray-900 capitalize">{label}</h3>
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
        {options.map((d) => (
          <li
            key={d}
            className="w-full border-b border-gray-200 rounded-t-lg select-none"
            >
            <div className="flex items-center pl-3 cursor-pointer hover:bg-blue-50">
              <input
                id={`${d}-checkbox`}
                type="checkbox"
                value={d}
                onChange={onClickHandler}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500focus:ring-2"
              />
              <label
                htmlFor={`${d}-checkbox`}
                className="w-full py-1 ml-2 text-sm font-medium text-gray-900 capitalize cursor-pointer"
              >
                {d}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Filters;
