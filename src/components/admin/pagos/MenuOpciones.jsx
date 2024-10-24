import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { menuItems } from "../../../models/ItemsPagos";

export default function MenuOpciones() {

    const items = menuItems;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-10">
            {
                items.map((item, index) => (
                    <Link to={item.path} key={index} className="block">
                        <Card
                            className="hover:bg-gray-100 cursor-pointer transition-all duration-200 transform hover:-translate-y-1"
                        >
                            <div className="flex flex-row items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <item.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h1 className="text-xl">{item.title}</h1>
                                    <span>{item.description}</span>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))
            }
        </div>
    );
}
