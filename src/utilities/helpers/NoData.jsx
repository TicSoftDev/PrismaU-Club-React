import { Search } from 'lucide-react'

export default function NoData({ mensaje }) {
    return (
        <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex flex-col items-center">
                <Search className="h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-lg font-medium mb-1">{mensaje}</h3>
            </div>
        </div>
    )
}
