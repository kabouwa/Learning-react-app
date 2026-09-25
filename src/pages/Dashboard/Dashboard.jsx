import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useLoading } from "../../context/LoadingContext";
import { dashboardApi } from "../../api/dashboard";
import { useUser } from "../../context/UserContext";
import { useDashboard } from "../../context/DashboardContext";
import { DollarSign, ShoppingBag, CalendarDays, Clock, CheckCircle2, ShoppingCart, Trophy, TrendingUp, PieChart, LineChart, Hourglass, ChefHat, Bell, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";

const statusIconMap = {
  Pending: { icon: Hourglass, color: "text-amber-500", bg: "bg-amber-50" },
  Preparing: { icon: ChefHat, color: "text-blue-500", bg: "bg-blue-50" },
  Ready: { icon: Bell, color: "text-purple-500", bg: "bg-purple-50" },
  Completed: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
  Cancelled: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
};


function StatCard({ icon: Icon, label, value, color = "text-blue-700", bg = "bg-blue-50" }) {
  return (
    <div className={`bg-white/99 dark:bg-gray-800 w-full rounded-xl py-4 px-6 flex gap-3 items-center justify-between text-dark dark:text-white`}>
        <div className={`p-2.5 ${color} ${bg} rounded`}>
            <Icon size={20} />
        </div>

        <div className="flex-1 flex flex-col">
            <small className="text-gray-500 dark:text-gray-300 text-sm">{label}</small>
            <p className="font-bold text-black/99 dark:text-white m-0">{value}</p>
        </div>
    </div>
  )
}

export default function Dashboard() {
    const { user, shop } = useUser();
    const { setLoading } = useLoading();
    const { statistics, setStatistics } = useDashboard();

    useEffect(() => {
        async function loadStatistics() {
            setLoading(true);

            try{
                let response = await dashboardApi.statistics();
                setStatistics(response.data);
            } finally {
                setLoading(false);
            }
        }

        if (user && !statistics) loadStatistics();
    }, [user]);


    if (!statistics) {
        return (
            <div className="my-2 mx-4">Loading statistics....</div>
        )
    }


    return (
        <motion.div className="flex flex-col items-stretch gap-4" transition={{ ease : 'easeInOut' }} initial={{ opacity : 0 }} animate={{ opacity : 1 }}>
            <h1>
                Welcome Mr <span className="text-indigo-500">{user?.name}</span> in <span className="text-indigo-500">{shop?.shop_name}</span> Dashboard !
            </h1>
            
            
            {/* Top stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-2">
                <StatCard icon={DollarSign}   label="Total Revenue"    value={`$ ${statistics?.total_revenue}`}     color={statusIconMap.Completed.color} bg={statusIconMap.Completed.bg} />
                <StatCard icon={ShoppingBag}  label="Total Orders"     value={`$ ${statistics?.total_orders}`}      color={statusIconMap.Ready.color}     bg={statusIconMap.Ready.bg} />
                <StatCard icon={CalendarDays} label="Today Orders"     value={`$ ${statistics?.today_orders}`}      color={statusIconMap.Preparing.color} bg={statusIconMap.Preparing.bg} />
                <StatCard icon={Clock}        label="Open Orders"      value={`$ ${statistics?.open_orders}`}       color="text-orange-500"               bg="bg-orange-50" />
                <StatCard icon={CheckCircle2} label="Completed Orders" value={`$ ${statistics?.completed_orders}`}  color={statusIconMap.Completed.color} bg={statusIconMap.Completed.bg} />
                <StatCard icon={ShoppingCart} label="Average Basket"   value={`$ ${statistics?.average_basket}`}    color="text-pink-500"                 bg="bg-pink-50" />
            </div>


            {/* Best seller */}
            <div className="bg-white/99 dark:bg-gray-800 w-full rounded-xl py-4 px-6 flex gap-3 items-center justify-between text-dark dark:text-white">
                <div className={`p-2.5 rounded ${statusIconMap.Pending.color} ${statusIconMap.Pending.bg}`}>
                    <Trophy size={20} />
                </div>

                <div className="flex-1 flex flex-col">
                    <small className="text-gray-500 dark:text-gray-300 text-sm">Best Selling Product</small>
                    <p className="font-bold text-black/99 dark:text-white m-0">
                        {statistics?.best_selling_product?.name}
                        <span className="text-gray-500 dark:text-gray-300 font-normal text-sm ml-1">
                            ({statistics?.best_selling_product?.quantity_sold} sold)
                        </span>
                    </p>

                </div>

                <Link to={routes.product_show + '/' + statistics?.best_selling_product?.slug} className="bg-indigo-500 text-white px-3 py-2 rounded hover:brightness-95 transition-all">View product</Link>
            </div>

            {/* Top products */}
            <div className="bg-white/99 dark:bg-gray-800 w-full rounded-xl py-4 px-6 text-dark dark:text-white">
                <p className="text-gray-500 dark:text-white flex gap-2 items-center">
                    <TrendingUp className="h-4 w-4 text-slate-500 dark:text-slate-300 mr-2" />
                    Top Products
                </p>
                <div className="flex flex-col gap-1 mt-3">
                    {
                        statistics?.top_products.map(p => (
                            <Link to={routes.product_show + '/' + p.slug} key={p.slug   } className="flex items-center justify-between gap-2 hover:bg-gray-100/70 dark:hover:bg-gray-500/30 cursor-pointer rounded py-1 px-2.5 dark:text-white">
                                <p>{p?.name}</p>
                                <p className="text-gray-600 dark:text-gray-300">{p?.quantity_sold} sold - ${p?.revenue}</p>
                            </Link>
                        ))
                    }
                </div> 

            </div>

            {/* Orders by status */}
            <div className="bg-white/99 dark:bg-gray-800 w-full rounded-xl py-4 px-6 text-dark dark:text-white">
                <p className="text-gray-500 dark:text-white flex gap-2 items-center">
                    <PieChart  className="h-4 w-4 text-slate-500 dark:text-slate-300 mr-2" />
                    Orders by Status
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 mt-3">
                    {
                        statistics?.orders_by_status.map(s => {
                            const conf = statusIconMap[s.status] || statusIconMap.Pending;
                            const Icon = conf.icon;
                            return (
                                <div key={s.status} className={`flex flex-col items-center justify-center px-4 py-3 rounded-xl             ${conf.color} ${conf.bg}`}>
                                    <Icon className={`w-5 h-5 ${conf.color}`} />
                                    <p className="text-slate-600">{s?.status}</p>
                                    <p className="text-black font-bold">{s?.count}</p>
                                </div>
                            )
                        }) 
                    }
                </div> 

            </div>

            {/* Revenue chart placeholder */}
            <div className="bg-white/99 dark:bg-gray-800 w-full rounded-xl py-4 px-6 text-dark dark:text-white">
                <p className="text-gray-500 dark:text-white flex gap-2 items-center">
                    <LineChart   className="h-4 w-4 text-slate-500 dark:text-slate-300 mr-2" />
                    Revenue ({statistics?.period})
                </p>
                {
                    statistics?.revenue_chart.map(r => (
                        <div className="flex items-center justify-between gap-2 mt-3 px-1">
                            <p className="text-slate-600 dark:text-slate-200">{r.label}</p>
                            <p className="text-black dark:text-white font-bold">$ {r.revenue}</p>
                        </div> 
                    ))
                }
            </div>
        </motion.div>
    )
}