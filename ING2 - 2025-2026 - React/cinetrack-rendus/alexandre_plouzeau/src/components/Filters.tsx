interface FiltersProps {
    filter: { label: string; value: string }[];
    defaultValue?: string;
    setFilter: (value: string) => void;
}

export default function Filters({
    filter,
    defaultValue,
    setFilter,
}: Readonly<FiltersProps & { defaultValue?: string }>) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <select
                    className="px-4 py-2 border border-gray-500 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                    value={defaultValue}
                    onChange={(e) => setFilter?.(e.target.value)}
                >
                    {filter.map((option) => (
                        <option key={option.value} value={option.value} defaultChecked={option.value === defaultValue}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
