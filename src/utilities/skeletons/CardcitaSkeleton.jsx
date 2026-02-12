
function CardcitaSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 flex-wrap mt-5">
            {
                Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} role="status" className="w-full border-4 border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                        <div className="flex items-center justify-center">
                            <div className="w-10 h-10 mb-4 bg-gray-300 rounded"></div>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                            <div className="h-2.5 bg-gray-200 rounded-full w-20"></div>
                        </div>
                    </div>
                ))
            }
        </div>


    );
}

export default CardcitaSkeleton;