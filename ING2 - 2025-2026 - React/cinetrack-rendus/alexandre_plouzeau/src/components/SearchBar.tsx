interface SearchBarProps {
    filterItems: (query: string) => void;
}

export default function SearchBar({ filterItems }: Readonly<SearchBarProps>) {
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        filterItems(query);
    };
    return (
        <div className="mb-4 border border-gray-500 rounded-xl w-full md:w-1/3">
            <input
                type="text"
                placeholder="🔍 Rechercher un film, une série..."
                className="text-white w-full p-2 bg-gray-900 placeholder-gray-500"
                onChange={handleSearch}
            />
        </div>
    );
}
